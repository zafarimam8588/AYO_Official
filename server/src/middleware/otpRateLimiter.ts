import { Request, Response, NextFunction } from "express";

import OTP from "../models/OTPModel";
import { getClientIP } from "../utils/otpSecurity";

/**
 * Middleware to rate limit OTP requests
 * This provides an additional layer of protection on top of the database-level rate limiting
 */
export const otpRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email?.toLowerCase();
    const ipAddress = getClientIP(req);

    if (!email) {
      // Let the controller handle missing email
      next();
      return;
    }

    // Check rate limits using the OTP model's static method
    const rateCheck = await (OTP as any).checkRateLimit(email, ipAddress);

    if (!rateCheck.allowed) {
      res.status(429).json({
        success: false,
        message: rateCheck.reason || "Too many requests",
        error: "RATE_LIMITED",
        retryAfter: rateCheck.retryAfter,
      });
      return;
    }

    // Check if email is currently blocked
    const blockedOTP = await OTP.findOne({
      email,
      isBlocked: true,
      blockedUntil: { $gt: new Date() },
    });

    if (blockedOTP) {
      const retryAfter = Math.ceil(
        (blockedOTP.blockedUntil!.getTime() - Date.now()) / 1000
      );

      res.status(429).json({
        success: false,
        message: "Account temporarily blocked due to too many failed attempts",
        error: "BLOCKED",
        retryAfter,
      });
      return;
    }

    next();
  } catch (error) {
    console.error("OTP rate limiter error:", error);
    // Don't block requests on rate limiter errors, let the request through
    next();
  }
};

/**
 * Middleware to check OTP verification rate limits
 * More strict than generation limits
 */
export const otpVerificationRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email?.toLowerCase();

    if (!email) {
      next();
      return;
    }

    // Find the OTP record to check attempts
    const otpRecord = await OTP.findOne({
      email,
    }).sort({ createdAt: -1 });

    if (otpRecord) {
      // Check if blocked
      if (otpRecord.isBlocked && otpRecord.blockedUntil) {
        if (new Date() < otpRecord.blockedUntil) {
          const retryAfter = Math.ceil(
            (otpRecord.blockedUntil.getTime() - Date.now()) / 1000
          );

          res.status(429).json({
            success: false,
            message:
              "Account temporarily blocked due to too many failed attempts",
            error: "BLOCKED",
            retryAfter,
          });
          return;
        }
      }
    }

    next();
  } catch (error) {
    console.error("OTP verification rate limiter error:", error);
    next();
  }
};

/**
 * Cleanup expired blocks (can be run periodically)
 */
export const cleanupExpiredBlocks = async (): Promise<void> => {
  try {
    const count = await (OTP as any).cleanupExpiredBlocks();
    if (count > 0) {
      console.log(`[OTP Cleanup] Unblocked ${count} expired OTP records`);
    }
  } catch (error) {
    console.error("[OTP Cleanup] Error cleaning up expired blocks:", error);
  }
};

/**
 * Start periodic cleanup of expired blocks (every 5 minutes)
 */
export const startOTPCleanupJob = (): NodeJS.Timeout => {
  const intervalMs = 5 * 60 * 1000; // 5 minutes

  console.log(
    `[OTP Cleanup] Starting periodic cleanup job (interval: ${intervalMs / 1000}s)`
  );

  return setInterval(async () => {
    await cleanupExpiredBlocks();
  }, intervalMs);
};
