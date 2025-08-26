// routes/authRoutes.ts
import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  resendOTP,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/authController";
import { isLoggedIn } from "../middleware/authMiddleware";
import passport from "passport";
import {
  getGoogleAuthURL,
  googleAuthCallback,
} from "../controllers/googleAuthController";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Google related routes

router.get("/google/url", getGoogleAuthURL);

// WE DONOT NEED THIS BEACUSE WE ARE SENDING URL BACK TO FRONTEND
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     session: false, // Token-based, no sessions
//   })
// );

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false, // No sessions
  }),
  googleAuthCallback // Success handler
);

// Protected routes
router.post("/logout", isLoggedIn, logout);

export default router;
