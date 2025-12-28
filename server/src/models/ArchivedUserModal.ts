import mongoose, { Schema } from "mongoose";

import { IArchivedUser } from "../types";

const ArchivedAddressSchema = new Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
  { _id: false }
);

const ArchivedProfileSchema = new Schema(
  {
    address: { type: ArchivedAddressSchema },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    whyJoin: { type: String },
    idProof: { type: String },
    memberStatus: {
      type: String,
      enum: ["not_submitted", "pending", "approved", "rejected"],
    },
    membershipId: { type: String },
    approvedBy: { type: mongoose.Schema.Types.ObjectId },
    approvedAt: { type: Date },
    rejectionReason: { type: String },
    profileCreatedAt: { type: Date },
    profileUpdatedAt: { type: Date },
  },
  { _id: false }
);

const ArchivedUserSchema = new Schema<IArchivedUser>(
  {
    // Original User ID for reference
    originalUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    // Preserved User Data
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      required: true,
    },
    googleId: { type: String },
    profilePic: { type: String },
    isVerified: {
      type: Boolean,
      required: true,
    },
    isProfileComplete: {
      type: Boolean,
      required: true,
    },
    userCreatedAt: {
      type: Date,
      required: true,
    },
    userUpdatedAt: {
      type: Date,
      required: true,
    },

    // Preserved Profile Data (optional - user may not have profile)
    profile: { type: ArchivedProfileSchema },

    // Archive Metadata
    archivedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    archivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    archiveReason: {
      type: String,
      maxlength: [500, "Archive reason cannot exceed 500 characters"],
    },
    archiveSource: {
      type: String,
      enum: ["admin_action", "user_request", "system"],
      default: "admin_action",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
ArchivedUserSchema.index({ email: 1 });
ArchivedUserSchema.index({ archivedAt: -1 });
ArchivedUserSchema.index({ archivedBy: 1 });
ArchivedUserSchema.index({ fullName: "text", email: "text" });

export default mongoose.model<IArchivedUser>(
  "ArchivedUser",
  ArchivedUserSchema
);
