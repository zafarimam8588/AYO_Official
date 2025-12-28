import mongoose, { Schema } from "mongoose";

import { IOTP } from "../types";

// OTP Configuration constants
export const OTP_CONFIG = {
  length: parseInt(process.env.OTP_LENGTH || "6", 10),
  expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES || "10", 10),
  maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS || "5", 10),
  blockDurationMinutes: parseInt(
    process.env.OTP_BLOCK_DURATION_MINUTES || "30",
    10
  ),
  rateLimit: {
    maxRequests: parseInt(process.env.OTP_RATE_LIMIT_MAX || "3", 10),
    windowMinutes: parseInt(
      process.env.OTP_RATE_LIMIT_WINDOW_MINUTES || "15",
      10
    ),
  },
};

const OTPSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["email-verification", "password-reset"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 },
    },

    // Security fields
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      default: "",
    },
    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxAttempts: {
      type: Number,
      default: OTP_CONFIG.maxAttempts,
      min: 1,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    blockedUntil: {
      type: Date,
      default: null,
    },

    // Rate limiting fields
    requestCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    windowStart: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
OTPSchema.index({ email: 1, type: 1 });
OTPSchema.index({ ipAddress: 1, windowStart: 1 });
OTPSchema.index({ email: 1, isBlocked: 1 });

// Instance method to check if OTP is expired
OTPSchema.methods.isExpired = function (): boolean {
  return new Date() > this.expiresAt;
};

// Instance method to check if blocked
OTPSchema.methods.isCurrentlyBlocked = function (): boolean {
  if (!this.isBlocked) {
    return false;
  }
  if (!this.blockedUntil) {
    return false;
  }
  return new Date() < this.blockedUntil;
};

// Instance method to get remaining attempts
OTPSchema.methods.getRemainingAttempts = function (): number {
  return Math.max(0, this.maxAttempts - this.attempts);
};

// Instance method to increment failed attempts
OTPSchema.methods.incrementAttempts = async function (): Promise<boolean> {
  this.attempts += 1;

  if (this.attempts >= this.maxAttempts) {
    this.isBlocked = true;
    this.blockedUntil = new Date(
      Date.now() + OTP_CONFIG.blockDurationMinutes * 60 * 1000
    );
  }

  await this.save();
  return this.isBlocked;
};

// Static method to check rate limit for email
OTPSchema.statics.checkRateLimit = async function (
  email: string,
  ipAddress: string
): Promise<{
  allowed: boolean;
  retryAfter?: number;
  reason?: string;
}> {
  const windowStart = new Date(
    Date.now() - OTP_CONFIG.rateLimit.windowMinutes * 60 * 1000
  );

  // Check email-based rate limit
  const emailCount = await this.countDocuments({
    email: email.toLowerCase(),
    createdAt: { $gte: windowStart },
  });

  if (emailCount >= OTP_CONFIG.rateLimit.maxRequests) {
    const oldestOTP = await this.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: windowStart },
    }).sort({ createdAt: 1 });

    const retryAfter = oldestOTP
      ? Math.ceil(
          (oldestOTP.createdAt.getTime() +
            OTP_CONFIG.rateLimit.windowMinutes * 60 * 1000 -
            Date.now()) /
            1000
        )
      : OTP_CONFIG.rateLimit.windowMinutes * 60;

    return {
      allowed: false,
      retryAfter,
      reason: "Too many OTP requests for this email",
    };
  }

  // Check IP-based rate limit (more lenient - 10x email limit)
  const ipCount = await this.countDocuments({
    ipAddress,
    createdAt: { $gte: windowStart },
  });

  if (ipCount >= OTP_CONFIG.rateLimit.maxRequests * 10) {
    return {
      allowed: false,
      retryAfter: OTP_CONFIG.rateLimit.windowMinutes * 60,
      reason: "Too many OTP requests from this IP",
    };
  }

  return { allowed: true };
};

// Static method to clean up blocked OTPs that have expired blocks
OTPSchema.statics.cleanupExpiredBlocks = async function (): Promise<number> {
  const result = await this.updateMany(
    {
      isBlocked: true,
      blockedUntil: { $lt: new Date() },
    },
    {
      $set: { isBlocked: false, attempts: 0 },
      $unset: { blockedUntil: 1 },
    }
  );

  return result.modifiedCount;
};

export default mongoose.model<IOTP>("OTP", OTPSchema);
