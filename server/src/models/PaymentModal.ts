import mongoose, { Schema } from "mongoose";
import { IPayment } from "../types";

const PaymentSchema = new Schema<IPayment>(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be at least ₹1"],
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR"],
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: String,
    razorpaySignature: String,
    donorInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: String,
      isAnonymous: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
