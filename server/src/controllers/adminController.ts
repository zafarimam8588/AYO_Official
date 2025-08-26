//  IN THE NEXT UPDATE DONOT DELETE THE USER OR MEMBER JUST DEACTIVATE THEIR ACCOUNT
import { Request, Response } from "express";
import EmailService from "../services/emailService";
import { AccountDeletionRequest } from "../models/AccountDeleteModal";
import mongoose from "mongoose";
import User from "../models/UserModal";
import Member from "../models/ProfileModel";
import OTP from "../models/OTPModel";
import Payment from "../models/PaymentModal";
import { IUser } from "../types";
import { generateMembershipId } from "../utils/membershipHelper";

export const getAllMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { "personalInfo.fullName": { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { membershipId: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("userId", "fullName email");

    const total = await Member.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: {
        members,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: members.length,
          totalMembers: total,
        },
      },
    });
  } catch (error: any) {
    console.error("Get all members error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve members",
      error: error.message,
    });
  }
};

export const approveMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { memberId } = req.params;

    // VALIDATE OBJECTID FORMAT FIRST
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      res.status(400).json({
        success: false,
        message: "Invalid member ID format. Please provide a valid member ID.",
      });
      return;
    }

    // Now safe to query with valid ObjectId
    const member = await Member.findByIdAndUpdate(
      memberId,
      {
        memberStatus: "approved",
        approvedBy: user._id,
        approvedAt: new Date(),
        membershipId: generateMembershipId(), // ✅ Generate if missing
      },
      { new: true }
    )
      .populate("userId", "email fullName profilePic")
      .populate("approvedBy", "fullName email");

    if (!member) {
      res.status(404).json({
        success: false,
        message: "Member not found with the provided ID",
      });
      return;
    }

    //  Type assertion for populated fields
    const populatedUser = member.userId as any;
    const populatedAdmin = member.approvedBy as any;

    //  Generate membershipId if not present
    if (!member.membershipId) {
      member.membershipId = generateMembershipId();
      await member.save();
    }

    //  Ensure required fields exist before sending email
    if (
      !populatedUser?.email ||
      !populatedUser?.fullName ||
      !populatedAdmin?.fullName
    ) {
      res.status(500).json({
        success: false,
        message:
          "Member approval data is incomplete. Missing required user information.",
      });
      return;
    }

    //  Send approval email
    try {
      await EmailService.sendMembershipApprovalEmail(populatedUser.email, {
        fullName: populatedUser.fullName,
        membershipId: member.membershipId,
        approvedAt: member.approvedAt!,
        approvedBy: populatedAdmin.fullName,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue with response even if email fails
    }

    res.status(200).json({
      success: true,
      message: "Member approved successfully",
      data: {
        member: {
          id: member._id,
          email: populatedUser.email,
          fullName: populatedUser.fullName,
          memberStatus: member.memberStatus,
          membershipId: member.membershipId,
          approvedAt: member.approvedAt,
          approvedBy: populatedAdmin.fullName,
        },
      },
    });
  } catch (error: any) {
    console.error("Approve member error:", error);

    //  Handle specific error types
    if (error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: "Invalid member ID format",
      });
      return;
    }

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to approve member",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

export const rejectMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { memberId } = req.params;
    const { rejectionReason } = req.body;

    // Find and update member profile with population
    const member = await Member.findByIdAndUpdate(
      memberId,
      {
        memberStatus: "rejected",
        rejectionReason,
        approvedBy: user._id,
        approvedAt: new Date(), // Track when it was processed
      },
      { new: true }
    )
      .populate("userId", "email fullName profilePic") // Populate user details
      .populate("approvedBy", "fullName email"); // Populate admin details

    if (!member) {
      res.status(404).json({
        success: false,
        message: "Member not found",
      });
      return;
    }

    // Type assertion for populated fields
    const populatedUser = member.userId as any;
    const populatedAdmin = member.approvedBy as any;

    // Send rejection email
    await EmailService.sendMembershipRejectionEmail(
      populatedUser.email,
      populatedUser.fullName,
      rejectionReason || "No specific reason provided"
    );

    res.status(200).json({
      success: true,
      message: "Member rejected successfully",
      data: {
        member: {
          id: member._id,
          // User details from populated userId
          email: populatedUser.email,
          fullName: populatedUser.fullName,

          // Member profile details
          memberStatus: member.memberStatus,
          rejectionReason: member.rejectionReason,

          // Processing details
          approvedAt: member.approvedAt,
          approvedBy: populatedAdmin.fullName,
        },
      },
    });
  } catch (error: any) {
    console.error("Reject member error:", error);

    if (error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: "Invalid member ID format",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to reject member",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// This is not working as expect
export const getDashboardStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalMembers = await Member.countDocuments({ status: "approved" });
    const pendingMembers = await Member.countDocuments({ status: "pending" });
    const rejectedMembers = await Member.countDocuments({ status: "rejected" });
    const totalApplications = await Member.countDocuments();

    // Get monthly registration stats
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Member.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Get payment stats
    const totalDonations = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const recentMembers = await Member.find({ status: "approved" })
      .sort({ approvedAt: -1 })
      .limit(5)
      .select("personalInfo.fullName email membershipId approvedAt");

    res.status(200).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: {
        overview: {
          totalMembers,
          pendingMembers,
          rejectedMembers,
          totalApplications,
          totalDonations: totalDonations[0]?.total || 0,
        },
        monthlyStats,
        recentMembers,
      },
    });
  } catch (error: any) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard stats",
      error: error.message,
    });
  }
};

// This need to check
export const getPendingDeletionRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { requestId } = req.params;

    const deletionRequest = await AccountDeletionRequest.findById(
      requestId
    ).populate("userId");

    if (!deletionRequest) {
      res.status(404).json({
        success: false,
        message: "Deletion request not found",
      });
      return;
    }

    if (deletionRequest.deletionStatus !== "pending") {
      res.status(400).json({
        success: false,
        message: "Request has already been processed",
      });
      return;
    }

    const userId = deletionRequest.userId;

    // Start transaction for complete data cleanup
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Update deletion request status
        await AccountDeletionRequest.findByIdAndUpdate(
          requestId,
          {
            deletionStatus: "approved",
            processedBy: user._id,
          },
          { session }
        );

        // Delete all user-related data
        await Promise.all([
          // Delete user account
          User.findByIdAndDelete(userId, { session }),

          // Delete member profile
          Member.findOneAndDelete({ userId }, { session }),

          // Delete any OTPs
          OTP.deleteMany({ email: (userId as any).email }, { session }),

          // Delete other account deletion requests for this user
          AccountDeletionRequest.deleteMany(
            { userId, _id: { $ne: requestId } },
            { session }
          ),
        ]);
      });

      res.status(200).json({
        success: true,
        message: "Account deletion approved and completed successfully",
      });
    } catch (transactionError) {
      throw transactionError;
    } finally {
      await session.endSession();
    }
  } catch (error: any) {
    console.error("Approve deletion error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve account deletion",
    });
  }
};
