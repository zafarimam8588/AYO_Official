// this data is just demo data
// need to redesign it
import { Request, Response } from "express";
import Payment from "../models/PaymentModal";
import PaymentService from "../services/paymentService";
import { IUser } from "../types";

export const createDonation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount, paymentMethod, donorInfo, memberId } = req.body;

    if (!amount || !paymentMethod || !donorInfo) {
      res.status(400).json({
        success: false,
        message: "Amount, payment method, and donor info are required",
      });
      return;
    }

    // Create Razorpay order
    const order = await PaymentService.createOrder(amount);

    // Create payment record
    const payment = new Payment({
      memberId: memberId || null,
      amount,
      paymentMethod,
      razorpayOrderId: order.id,
      donorInfo,
      purpose: "donation",
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: "Donation order created successfully",
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        paymentId: payment._id,
      },
    });
  } catch (error: any) {
    console.error("Create donation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create donation order",
      error: error.message,
    });
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    // Verify payment signature
    const isValidSignature = PaymentService.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      await PaymentService.processFailedPayment(paymentId);
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
      return;
    }

    // Process successful payment
    await PaymentService.processSuccessfulPayment(
      paymentId,
      razorpay_payment_id,
      razorpay_signature
    );

    res.status(200).json({
      success: true,
      message: "Payment verified and processed successfully",
    });
  } catch (error: any) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

export const getPaymentHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let query: any = {};
    const user = req.user as IUser;
    // If regular member, show only their payments
    if (user.role === "member") {
      query.memberId = user._id;
    }

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("memberId", "personalInfo.fullName email");

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Payment history retrieved successfully",
      data: {
        payments,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: payments.length,
          totalPayments: total,
        },
      },
    });
  } catch (error: any) {
    console.error("Get payment history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payment history",
      error: error.message,
    });
  }
};
