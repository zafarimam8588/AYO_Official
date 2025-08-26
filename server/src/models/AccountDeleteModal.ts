import mongoose, { Schema } from "mongoose";
import { IAccountDeletionRequest } from "../types";

const AccountDeletionRequestSchema = new Schema<IAccountDeletionRequest>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true, // One pending request per user
    },
    reason: {
      type: String,
      trim: true,
      maxlength: [500, "Reason cannot exceed 500 characters"],
    },
    deletionStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const AccountDeletionRequest = mongoose.model<IAccountDeletionRequest>(
  "AccountDeletionRequest",
  AccountDeletionRequestSchema
);
