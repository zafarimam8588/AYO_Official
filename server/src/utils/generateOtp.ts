import crypto from "crypto";

export const generateOTP = (length: number = 6): string => {
  const otp = crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");
  return otp;
};

export const generateOTPExpiry = (minutes: number = 10): Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

export const validateOTP = (inputOTP: string, storedOTP: string): boolean => {
  return inputOTP === storedOTP;
};

export const isOTPExpired = (expiresAt: Date): boolean => {
  return new Date() > expiresAt;
};
