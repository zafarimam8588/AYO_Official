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
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
      return;
    }

    console.log(" User authenticated:", user.email);

    // Generate JWT token
    const token = generateToken(user._id);
    console.log("JWT token generated");

    const userData = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isVerified: user.isVerified,
      isProfileComplete: user.isProfileComplete,
      profilePic: user.profilePic,
    };

    // Redirect to frontend with success data
    // You can encode the data in URL params or use a temporary token approach
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    const encodedToken = encodeURIComponent(token);

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?success=true&user=${encodedUserData}&token=${encodedToken}`
    );
  } catch (error: any) {
    console.error("Google auth callback error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};
