import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import User from "../src/models/UserModal";
import { hashPassword } from "../src/utils/password";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const VIEWER_EMAIL = "viewer@ayo.com";
const VIEWER_PASSWORD = "ViewerAdmin@123";
const VIEWER_NAME = "Admin Viewer";

async function createViewerAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Check if viewer already exists
    const existingViewer = await User.findOne({ email: VIEWER_EMAIL });
    if (existingViewer) {
      console.log(`Viewer admin already exists: ${VIEWER_EMAIL}`);
      console.log("Updating role to 'viewer' if needed...");
      existingViewer.role = "viewer";
      await existingViewer.save();
      console.log("Viewer admin updated successfully!");
    } else {
      // Hash the password
      const hashedPassword = await hashPassword(VIEWER_PASSWORD);

      // Create the viewer admin
      const viewerAdmin = new User({
        email: VIEWER_EMAIL,
        password: hashedPassword,
        fullName: VIEWER_NAME,
        role: "viewer",
        isVerified: true,
        isProfileComplete: true,
      });

      await viewerAdmin.save();
      console.log("Viewer admin created successfully!");
    }

    console.log("\n=================================");
    console.log("VIEWER ADMIN CREDENTIALS");
    console.log("=================================");
    console.log(`Email: ${VIEWER_EMAIL}`);
    console.log(`Password: ${VIEWER_PASSWORD}`);
    console.log("=================================\n");
    console.log(
      "This user can view all admin functionality but cannot make any changes."
    );
  } catch (error) {
    console.error("Error creating viewer admin:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

createViewerAdmin();
