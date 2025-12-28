import { Request, Response } from "express";

import ContactMessage from "../models/ContactMessageModel";
import emailService from "../services/emailService";
import { IUser } from "../types";

// Create a new contact message (public route)
export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation (phone is optional)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required",
      });
    }

    // Create message (phone will be saved if provided, otherwise undefined)
    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || undefined, // Ensure empty strings become undefined
      subject,
      message,
    });

    console.log(
      `📧 New contact message from: ${email}${phone ? ` (${phone})` : ""}`
    );

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: contactMessage,
    });
  } catch (error: any) {
    console.error("❌ Create contact message error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
};

// Get all contact messages (admin only)
export const getAllContactMessages = async (req: Request, res: Response) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate("replies.repliedBy", "fullName email");

    const total = await ContactMessage.countDocuments(query);

    res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error: any) {
    console.error("❌ Get contact messages error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch messages",
    });
  }
};

// Get single contact message by ID (admin only)
export const getContactMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id).populate(
      "replies.repliedBy",
      "fullName email"
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Mark as read if it's unread
    if (message.status === "unread") {
      message.status = "read";
      await message.save();
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error: any) {
    console.error("❌ Get contact message by ID error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch message",
    });
  }
};

// Reply to contact message (admin only)
export const replyToContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const user = req.user as IUser;

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required",
      });
    }

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Add new reply to replies array
    message.replies.push({
      text: reply,
      repliedAt: new Date(),
      repliedBy: user._id,
    });
    message.status = "replied";
    await message.save();

    // Send email to user
    try {
      await emailService.sendEmail(
        message.email,
        `Re: ${message.subject}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Reply from Azad Youth Organization</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Original Message:</h3>
            <p style="color: #6b7280; line-height: 1.6;">${message.message}</p>
          </div>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <h3 style="color: #374151; margin-top: 0;">Our Reply:</h3>
            <p style="color: #374151; line-height: 1.6;">${reply}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Best regards,<br/>
              <strong>Azad Youth Organization Team</strong>
            </p>
          </div>
        </div>
        `
      );

      console.log(`✅ Reply email sent to: ${message.email}`);
    } catch (emailError) {
      console.error("❌ Failed to send reply email:", emailError);
      // Continue even if email fails
    }

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      data: message,
    });
  } catch (error: any) {
    console.error("❌ Reply to contact message error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send reply",
    });
  }
};

// Delete contact message (admin only)
export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Delete contact message error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete message",
    });
  }
};

// Get contact message statistics (admin only)
export const getContactMessageStats = async (req: Request, res: Response) => {
  try {
    const total = await ContactMessage.countDocuments();
    const unread = await ContactMessage.countDocuments({ status: "unread" });
    const read = await ContactMessage.countDocuments({ status: "read" });
    const replied = await ContactMessage.countDocuments({ status: "replied" });

    res.status(200).json({
      success: true,
      data: {
        total,
        unread,
        read,
        replied,
      },
    });
  } catch (error: any) {
    console.error("❌ Get contact message stats error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch statistics",
    });
  }
};
