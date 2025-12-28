import { Request, Response } from "express";

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
  } catch {
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
    const user = req.user as any;

    if (!user) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
    });

    const userData = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isVerified: user.isVerified,
      isProfileComplete: user.isProfileComplete,
      profilePic: user.profilePic,
    };

    // Set JWT as httpOnly secure cookie (more secure than URL params)
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Encode user data for frontend (token is now in cookie)
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?success=true&user=${encodedUserData}`
    );
  } catch {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};
