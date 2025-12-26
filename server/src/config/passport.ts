import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserModal";

// Only initialize Google OAuth strategy if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with Google ID
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Check if user exists with same email
        existingUser = await User.findOne({
          email: profile.emails?.[0]?.value?.toLowerCase(),
        });

        if (existingUser) {
          // Link Google account to existing user
          existingUser.googleId = profile.id;
          existingUser.isVerified = true;
          if (profile.photos?.[0]?.value) {
            existingUser.profilePic = profile.photos[0].value;
          }
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails?.[0]?.value?.toLowerCase(),
          fullName: profile.displayName,
          profilePic: profile.photos?.[0].value,
          isVerified: true, // Google users are auto-verified
          role: "member",
          isProfileComplete: false,
        });

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, undefined);
      }
    }
    )
  );
} else {
  console.warn("⚠️  Google OAuth credentials not found. Google authentication will be disabled.");
}

export default passport;
