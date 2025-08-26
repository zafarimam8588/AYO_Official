import { AccountDeletionRequest } from "../models/AccountDeleteModal";
import { Request, Response } from "express";
import { IUser } from "../types";

export const requestAccountDeletion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    const { reason } = req.body;

    const user = req.user as IUser;
    // Check if user already has a pending deletion request
    const existingRequest = await AccountDeletionRequest.findOne({
      userId: user._id,
      deletionStatus: "pending",
    });

    if (existingRequest) {
      res.status(400).json({
        success: false,
        message: "You already have a pending account deletion request",
      });
      return;
    }

    // Create deletion request
    const deletionRequest = new AccountDeletionRequest({
      userId: user._id,
      reason: reason?.trim(),
      deletionStatus: "pending",
    });

    await deletionRequest.save();

    res.status(201).json({
      success: true,
      message:
        "Account deletion request submitted successfully. An admin will review your request.",
      data: {
        requestId: deletionRequest._id,
        deletionStatus: deletionRequest.deletionStatus,
        createdAt: deletionRequest.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Request account deletion error:", error);

    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "You already have a pending deletion request",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit deletion request",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};
