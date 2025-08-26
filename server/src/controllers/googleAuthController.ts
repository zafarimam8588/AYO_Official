import { Request, Response } from "express";
import { LoginResponse } from "../types";
import { generateToken } from "../utils/generateToken";

export const getGoogleAuthURL = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authURL =
      `https://accounts.google.com/o/oauth2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${process.env.BASE_URL}/api/auth/google/callback&` +
      `scope=profile email&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    res.status(200).json({
      success: true,
      data: { authURL },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to generate auth URL",
    });
  }
};

export const googleAuthCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("🎯 Google auth callback triggered");

    const user = req.user as any;

    if (!user) {
      console.error("No user found in callback");
      res.status(401).json({
        success: false,
        message: "Google authentication failed",
      });
      return;
    }

    console.log("✅ User authenticated:", user.email);

    // Generate JWT token
    const token = generateToken(user._id);
    console.log("JWT token generated");

    // Send JSON response similar to login
    const response: LoginResponse = {
      success: true,
      message: "Google authentication successful",
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isVerified: user.isVerified,
          isProfileComplete: user.isProfileComplete,
          profilePic: user.profilePic, // Additional field from Google
        },
        token,
      },
    };

    console.log("Sending JSON response with token");
    res.status(200).json(response);
  } catch (error: any) {
    console.error("Google auth callback error:", error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};
