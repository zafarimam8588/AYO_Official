// WRITE FUNCTANILITY FOR CHANGE PASSWORD IN NEXT UPDATE
// FORGOT AND RESET PASSWWORD FUNCTUNALITY VIA CRYPTO AND SEND TO EMAIL
import { Request, Response } from "express";
import User from "../models/UserModal";
import OTP from "../models/OTPModel";
import EmailService from "../services/emailService";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/generateToken";
import { hashPassword } from "../utils/password";
import {
  generateOTP,
  generateOTPExpiry,
  validateOTP,
  isOTPExpired,
} from "../utils/generateOtp";
import { LoginResponse } from "../types";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
      confirmPassword,
      googleId,
      fullName,
      profilePic,
      role = "member",
      isVerified = false,
    } = req.body;

    // Validation: Either password or googleId must be provided
    if (!googleId && !password) {
      res.status(400).json({
        success: false,
        message: "Password is required for regular registration",
      });
      return;
    }

    // Check password length
    if (!googleId && password && password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }
    // matching password and confirm password

    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Passwords do not match, message from backend",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "A user with this email or Google account already exists",
      });
      return;
    }

    // For regular registration, send OTP BEFORE creating user
    if (!googleId) {
      // Generate OTP for email verification
      const otp = generateOTP();
      const expiresAt = generateOTPExpiry(10); // 10 minutes

      try {
        // STEP 1: Send email first (before creating user)
        await EmailService.sendOTPEmail(email, otp, "email-verification");
        console.log(
          "OTP email sent successfully, proceeding with user creation"
        );
      } catch (emailError) {
        const error = emailError as Error;
        console.error("Failed to send OTP email:", emailError);

        // Fail registration if email can't be sent
        res.status(500).json({
          success: false,
          message: "Unable to send verification email. Please try again later.",
          error:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        });
        return; //Exit early - don't create user
      }

      // STEP 2: Create user only after email is sent successfully
      const userData: any = {
        email: email.toLowerCase(),
        fullName: fullName.trim(),
        role,
        isVerified,
        isProfileComplete: false,
        password: await hashPassword(password),
      };

      if (profilePic) {
        userData.profilePic = profilePic;
      }

      const user = new User(userData);
      await user.save();

      // STEP 3: Save OTP only after user is created
      await OTP.create({
        email: email.toLowerCase(),
        otp,
        type: "email-verification",
        expiresAt,
      });

      res.status(201).json({
        success: true,
        message:
          "Registration successful! Please check your email for verification code.",
        data: {
          userId: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isProfileComplete: user.isProfileComplete,
          needsVerification: true,
        },
      });
    } else {
      // Google OAuth registration (no email verification needed)
      const userData: any = {
        email: email.toLowerCase(),
        fullName: fullName.trim(),
        role,
        isVerified: true, // Google users are auto-verified
        isProfileComplete: false,
        googleId,
      };

      if (profilePic) {
        userData.profilePic = profilePic;
      }

      const user = new User(userData);
      await user.save();

      res.status(201).json({
        success: true,
        message: "Google registration successful!",
        data: {
          userId: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isProfileComplete: user.isProfileComplete,
          needsVerification: false,
        },
      });
    }
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      let message = "Registration failed due to duplicate data";

      if (error.keyPattern?.email) {
        message = "Email address already exists";
      } else if (error.keyPattern?.googleId) {
        message = "Google account already registered";
      }

      res.status(400).json({
        success: false,
        message,
      });
      return;
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);

    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
      return;
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      type: "email-verification",
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "No verification request found for this email",
      });
      return;
    }

    // Check if OTP is expired
    if (isOTPExpired(otpRecord.expiresAt)) {
      res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
      return;
    }

    // Validate OTP
    if (!validateOTP(otp, otpRecord.otp)) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    // Update member verification status
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Member not found",
      });
      return;
    }

    // Delete the used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Send welcome email
    await EmailService.sendWelcomeEmail(user);

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Email verified successfully! Welcome to AYO family.",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.fullName,
          role: user.role,
          isVerified: user.isVerified,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      message: "Email verification failed",
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // Find member with password field
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Check password
    const isPasswordValid = await comparePassword(
      password,
      user.password || ""
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    if (!user.isVerified) {
      res.status(401).json({
        success: false,
        message: "Please verify your email before logging in",
        data: {
          needsVerification: true,
          email: user.email,
        },
      });
      return;
    }

    // Generate token
    const token = generateToken(user._id);

    res.cookie("authToken", token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: "/", // Available across entire site
    });

    const response: LoginResponse = {
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isVerified: user.isVerified,
          isProfileComplete: user.isProfileComplete,
        },
        token,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, type = "email-verification" } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    // Check if member exists
    const member = await User.findOne({ email: email.toLowerCase() });
    if (!member) {
      res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
      return;
    }

    // Delete any existing OTPs for this email and type
    await OTP.deleteMany({ email: email.toLowerCase(), type });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = generateOTPExpiry(10);

    await OTP.create({
      email: email.toLowerCase(),
      otp,
      type,
      expiresAt,
    });

    // Send OTP email
    await EmailService.sendOTPEmail(email, otp, type);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error: any) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
      return;
    }

    // Delete any existing password reset OTPs
    await OTP.deleteMany({
      email: email.toLowerCase(),
      type: "password-reset",
    });

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = generateOTPExpiry(10);

    await OTP.create({
      email: email.toLowerCase(),
      otp,
      type: "password-reset",
      expiresAt,
    });

    // Send reset email
    await EmailService.sendOTPEmail(email, otp, "password-reset");

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process password reset request",
      error: error.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
      return;
    }
    // matching password and confirm password

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Passwords do not match, message from backend",
      });
      return;
    }
    // Find the OTP record
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      type: "password-reset",
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "No password reset request found",
      });
      return;
    }

    // Check if OTP is expired
    if (isOTPExpired(otpRecord.expiresAt)) {
      res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
      return;
    }

    // Validate OTP
    if (!validateOTP(otp, otpRecord.otp)) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }
    const password = await hashPassword(newPassword);
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { password: password },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Member not found",
      });
      return;
    }

    // Delete the used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // NEED TO SEND MAIL AFTER RESETTING THE PASSWORD (OPTIONAL)

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Password reset failed",
      error: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};
