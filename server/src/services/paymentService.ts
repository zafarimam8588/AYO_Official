import crypto from "crypto";

import Razorpay from "razorpay";

import Payment from "../models/PaymentModal";

import EmailService from "./emailService";

class PaymentService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });
  }

  async createOrder(amount: number, currency: string = "INR"): Promise<any> {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paisa
        currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };

      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error("Create order error:", error);
      throw new Error("Failed to create payment order");
    }
  }

  verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    try {
      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
        .update(body.toString())
        .digest("hex");

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error("Verify signature error:", error);
      return false;
    }
  }

  async processSuccessfulPayment(
    paymentId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<void> {
    try {
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          status: "completed",
          razorpayPaymentId,
          razorpaySignature,
        },
        { new: true }
      );

      if (payment) {
        // Send thank you email
        await EmailService.sendDonationThankYou(
          payment.donorInfo.email,
          payment.donorInfo.name,
          payment.amount,
          payment.donorInfo.isAnonymous
        );
      }
    } catch (error) {
      console.error("Process successful payment error:", error);
      throw error;
    }
  }

  async processFailedPayment(paymentId: string): Promise<void> {
    try {
      await Payment.findByIdAndUpdate(paymentId, { status: "failed" });
    } catch (error) {
      console.error("Process failed payment error:", error);
      throw error;
    }
  }
}

export default new PaymentService();
