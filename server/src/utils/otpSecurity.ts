import crypto from "crypto";

import { Request } from "express";

import OTP, { OTP_CONFIG } from "../models/OTPModel";

// Scrypt configuration for OTP hashing
const SCRYPT_CONFIG = {
  keyLength: 64,
  cost: 16384, // N
  blockSize: 8, // r
  parallelization: 1, // p
};

// OTP verification result types
export interface OTPVerificationResult {
  success: boolean;
  error?:
    | "NO_OTP_FOUND"
    | "EXPIRED"
    | "BLOCKED"
    | "INVALID_OTP"
    | "MAX_ATTEMPTS_EXCEEDED"
    | "RATE_LIMITED";
  message: string;
  remainingAttempts?: number;
  retryAfter?: number;
}

export interface OTPGenerationResult {
  success: boolean;
  otp?: string;
  error?: "RATE_LIMITED" | "BLOCKED" | "INTERNAL_ERROR";
  message: string;
  retryAfter?: number;
}

/**
 * Generate a cryptographically secure random OTP
 */
export function generateOTP(length: number = OTP_CONFIG.length): string {
  const max = Math.pow(10, length);
  const otp = crypto.randomInt(0, max).toString().padStart(length, "0");
  return otp;
}

/**
 * Generate a cryptographically secure random salt
 */
export function generateSalt(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Hash an OTP using scrypt (memory-hard, secure against brute force)
 */
export async function hashOTP(otp: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      otp,
      salt,
      SCRYPT_CONFIG.keyLength,
      {
        N: SCRYPT_CONFIG.cost,
        r: SCRYPT_CONFIG.blockSize,
        p: SCRYPT_CONFIG.parallelization,
      },
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString("hex"));
        }
      }
    );
  });
}

/**
 * Timing-safe comparison of two strings
 * Prevents timing attacks by always taking the same amount of time
 */
export function timingSafeCompare(a: string, b: string): boolean {
  // If lengths differ, we still do a comparison to prevent timing leaks
  if (a.length !== b.length) {
    // Compare with self to maintain constant time
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a));
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Extract client IP address from request
 * Handles various proxy headers
 */
export function getClientIP(req: Request): string {
  // Check X-Forwarded-For header (common for proxies/load balancers)
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    const ips =
      typeof forwardedFor === "string"
        ? forwardedFor.split(",")
        : forwardedFor[0].split(",");
    return ips[0].trim();
  }

  // Check X-Real-IP header (Nginx)
  const realIP = req.headers["x-real-ip"];
  if (realIP) {
    return Array.isArray(realIP) ? realIP[0] : realIP;
  }

  // Check CF-Connecting-IP header (Cloudflare)
  const cfIP = req.headers["cf-connecting-ip"];
  if (cfIP) {
    return Array.isArray(cfIP) ? cfIP[0] : cfIP;
  }

  // Fallback to socket remote address
  return req.ip || req.socket?.remoteAddress || "unknown";
}

/**
 * Calculate OTP expiry time
 */
export function generateOTPExpiry(
  minutes: number = OTP_CONFIG.expiryMinutes
): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

/**
 * Check if an OTP is expired
 */
export function isOTPExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Create a new secure OTP record
 */
export async function createSecureOTP(
  email: string,
  type: "email-verification" | "password-reset",
  req: Request
): Promise<OTPGenerationResult> {
  const ipAddress = getClientIP(req);
  const userAgent = req.headers["user-agent"] || "";

  try {
    // Check rate limits
    const rateCheck = await (OTP as any).checkRateLimit(email, ipAddress);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: "RATE_LIMITED",
        message: rateCheck.reason || "Too many OTP requests",
        retryAfter: rateCheck.retryAfter,
      };
    }

    // Check if there's an existing blocked OTP for this email
    const existingBlocked = await OTP.findOne({
      email: email.toLowerCase(),
      type,
      isBlocked: true,
      blockedUntil: { $gt: new Date() },
    });

    if (existingBlocked) {
      const retryAfter = Math.ceil(
        (existingBlocked.blockedUntil!.getTime() - Date.now()) / 1000
      );
      return {
        success: false,
        error: "BLOCKED",
        message: "Account temporarily blocked due to too many failed attempts",
        retryAfter,
      };
    }

    // Delete any existing OTPs for this email and type
    await OTP.deleteMany({ email: email.toLowerCase(), type });

    // Generate new OTP
    const otp = generateOTP();
    const salt = generateSalt();
    const otpHash = await hashOTP(otp, salt);
    const expiresAt = generateOTPExpiry();

    // Create new OTP record
    await OTP.create({
      email: email.toLowerCase(),
      otpHash,
      salt,
      type,
      expiresAt,
      ipAddress,
      userAgent,
      attempts: 0,
      maxAttempts: OTP_CONFIG.maxAttempts,
      isBlocked: false,
      requestCount: 1,
      windowStart: new Date(),
    });

    return {
      success: true,
      otp, // Return plain OTP to send via email
      message: "OTP created successfully",
    };
  } catch (error) {
    console.error("Error creating secure OTP:", error);
    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to generate OTP",
    };
  }
}

/**
 * Verify an OTP with security checks
 */
export async function verifySecureOTP(
  email: string,
  inputOTP: string,
  type: "email-verification" | "password-reset",
  req: Request
): Promise<OTPVerificationResult> {
  const ipAddress = getClientIP(req);

  try {
    // Find the most recent OTP for this email and type
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      type,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return {
        success: false,
        error: "NO_OTP_FOUND",
        message: "No OTP found for this email. Please request a new OTP.",
      };
    }

    // Check if blocked
    if (otpRecord.isBlocked) {
      if (otpRecord.blockedUntil && new Date() < otpRecord.blockedUntil) {
        const retryAfter = Math.ceil(
          (otpRecord.blockedUntil.getTime() - Date.now()) / 1000
        );
        return {
          success: false,
          error: "BLOCKED",
          message:
            "Account temporarily blocked due to too many failed attempts",
          retryAfter,
        };
      }
      // Unblock if time has passed
      otpRecord.isBlocked = false;
      otpRecord.attempts = 0;
      otpRecord.blockedUntil = undefined;
    }

    // Check expiry
    if (isOTPExpired(otpRecord.expiresAt)) {
      return {
        success: false,
        error: "EXPIRED",
        message: "OTP has expired. Please request a new one.",
      };
    }

    // Hash input OTP and compare (timing-safe)
    const inputHash = await hashOTP(inputOTP, otpRecord.salt);
    const isValid = timingSafeCompare(inputHash, otpRecord.otpHash);

    if (!isValid) {
      otpRecord.attempts += 1;
      const remainingAttempts = otpRecord.maxAttempts - otpRecord.attempts;

      if (otpRecord.attempts >= otpRecord.maxAttempts) {
        otpRecord.isBlocked = true;
        otpRecord.blockedUntil = new Date(
          Date.now() + OTP_CONFIG.blockDurationMinutes * 60 * 1000
        );
        await otpRecord.save();

        // Log security event
        console.warn(
          `[SECURITY] OTP verification blocked for ${email} from IP ${ipAddress} after ${otpRecord.attempts} failed attempts`
        );

        return {
          success: false,
          error: "MAX_ATTEMPTS_EXCEEDED",
          message: `Too many failed attempts. Account blocked for ${OTP_CONFIG.blockDurationMinutes} minutes.`,
          retryAfter: OTP_CONFIG.blockDurationMinutes * 60,
        };
      }

      await otpRecord.save();
      return {
        success: false,
        error: "INVALID_OTP",
        message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.`,
        remainingAttempts,
      };
    }

    // Success - delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    return {
      success: true,
      message: "OTP verified successfully",
    };
  } catch (error) {
    console.error("Error verifying secure OTP:", error);
    return {
      success: false,
      error: "INVALID_OTP",
      message: "Failed to verify OTP",
    };
  }
}

/**
 * Delete all OTPs for an email (cleanup after successful verification)
 */
export async function deleteOTPsForEmail(
  email: string,
  type?: "email-verification" | "password-reset"
): Promise<void> {
  const query: any = { email: email.toLowerCase() };
  if (type) {
    query.type = type;
  }
  await OTP.deleteMany(query);
}

/**
 * Check if there's a valid (non-expired, non-blocked) OTP for an email
 */
export async function hasValidOTP(
  email: string,
  type: "email-verification" | "password-reset"
): Promise<boolean> {
  const otpRecord = await OTP.findOne({
    email: email.toLowerCase(),
    type,
    expiresAt: { $gt: new Date() },
    isBlocked: false,
  });

  return !!otpRecord;
}
