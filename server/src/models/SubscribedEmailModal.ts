import mongoose from "mongoose";
import { ISubscribedEmail } from "../types";

const SubscribedEmailSchema = new mongoose.Schema<ISubscribedEmail>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubscribedEmail>(
  "SubscribedEmailModal",
  SubscribedEmailSchema
);
