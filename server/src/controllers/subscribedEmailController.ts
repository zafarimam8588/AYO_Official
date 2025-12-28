import { Request, Response } from "express";

import SubscribedEmaiLModal from "../models/SubscribedEmailModal";
import emailService from "../services/emailService";

export const SubscribedEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const existingEmail = await SubscribedEmaiLModal.findOne({ email });

    if (existingEmail) {
      res.status(409).json({
        success: false,
        message: "This email is already subscribed",
      });
      return;
    }

    const newEmail = new SubscribedEmaiLModal({
      email,
    });

    await newEmail.save();

    res.status(201).json({
      success: true,
      message: "Email saved successfully",
    });
  } catch (error) {
    console.error("Email save error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
    return;
  }
};

export const getAllEmails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allEmails = await SubscribedEmaiLModal.find({});

    res.status(200).json({
      success: true,
      data: {
        allEmails,
      },
    });
  } catch (error) {
    console.error("Get emails error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a subscribed email (admin only)
export const deleteSubscribedEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const email = await SubscribedEmaiLModal.findByIdAndDelete(id);

    if (!email) {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    console.error("Delete email error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Send email to all subscribers (admin only)
export const sendEmailToAllSubscribers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });
      return;
    }

    // Get all subscribed emails
    const subscribers = await SubscribedEmaiLModal.find({});

    if (subscribers.length === 0) {
      res.status(404).json({
        success: false,
        message: "No subscribers found",
      });
      return;
    }

    // Send email to each subscriber using the newsletter template
    const emailPromises = subscribers.map((subscriber) =>
      emailService.sendNewsletterToSubscriber(
        subscriber.email,
        subject,
        message
      )
    );

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    console.log(`✅ Sent email to ${subscribers.length} subscribers`);

    res.status(200).json({
      success: true,
      message: `Email sent successfully to ${subscribers.length} subscribers`,
      count: subscribers.length,
    });
  } catch (error) {
    console.error("Send email to all error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send emails. Please try again later.",
    });
  }
};
