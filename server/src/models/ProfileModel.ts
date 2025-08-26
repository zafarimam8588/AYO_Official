import mongoose, { Schema } from "mongoose";
import { IMemberProfile } from "../types";

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const MemberProfileSchema = new Schema<IMemberProfile>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
      index: true,
    },

    address: {
      type: AddressSchema as any,
      required: [true, "Address is required"],
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"],
      unique: true,
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },

    whyJoin: {
      type: String,
      required: [true, "Reason for joining is required"],
      trim: true,
    },

    idProof: {
      type: String,
    },

    memberStatus: {
      type: String,
      enum: ["not_submitted", "pending", "approved", "rejected"],
      default: "not_submitted",
    },

    membershipId: {
      type: String,
      unique: true,
      sparse: true, // Only enforce uniqueness for non-null values
    },

    // Admin fields
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },

    rejectionReason: {
      type: String,
      maxlength: [500, "Rejection reason cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Generate membership ID for approved members
MemberProfileSchema.pre("save", async function (next) {
  if (this.memberStatus === "approved" && !this.membershipId) {
    const year = new Date().getFullYear();
    const count = await mongoose
      .model<IMemberProfile>("Member")
      .countDocuments({
        status: "approved",
      });
    this.membershipId = `AYO${year}${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model<IMemberProfile>("Member", MemberProfileSchema);

//  MEMBERSHIPID AND MEMBERSHIP STATUS WILL BE CHANGED BY ADMIN CONTROLLER WHEN WHEN ADMIN APPROVES
