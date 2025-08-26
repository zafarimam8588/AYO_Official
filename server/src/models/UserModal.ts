import mongoose, { Schema } from "mongoose";

import { IUser } from "../types";

const UserSchema = new Schema<IUser>(
  {
    // Authentication fields
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
    },
    isProfileComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries

export default mongoose.model<IUser>("User", UserSchema);
