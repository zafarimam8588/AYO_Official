//  IN THE NEXT UPDATE DONOT DELETE THE USER OR MEMBER JUST DEACTIVATE THEIR ACCOUNT
import { Request, Response } from "express";
import EmailService from "../services/emailService";
import { AccountDeletionRequest } from "../models/AccountDeleteModal";
import mongoose, { Types } from "mongoose";
import User from "../models/UserModal";
import Member from "../models/ProfileModel";
import OTP from "../models/OTPModel";
import { IMemberProfile, IUser } from "../types";
import { generateMembershipId } from "../utils/membershipHelper";

export const getAllMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;

    const query: any = {};

    // Fix 1: Use correct field name
    if (status) {
      query.memberStatus = status; // Changed from 'status' to 'memberStatus'
    }

    // Fix 2: Use correct field paths for populated data
    if (search) {
      query.$or = [
        { "userId.fullName": { $regex: search, $options: "i" } }, // Populated field
        { "userId.email": { $regex: search, $options: "i" } }, // Populated field
        { membershipId: { $regex: search, $options: "i" } }, // Direct field
      ];
    }

    // Debug: Log the constructed query
    console.log("Query being executed:", JSON.stringify(query, null, 2));

    const skip = (Number(page) - 1) * Number(limit);

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("userId", "fullName email");

    const total = await Member.countDocuments(query);

    console.log(`Found ${members.length} members out of ${total} total`);

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

// Define populated member interface using your existing types
interface PopulatedMember
  extends Omit<IMemberProfile, "userId" | "approvedBy"> {
  userId: IUser;
  approvedBy?: IUser;
}

export const getMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { memberId } = req.params;

    // Validate memberId parameter
    if (!memberId) {
      res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
      return;
    }

    // Find member by ID and populate user information
    const member = await Member.findById(memberId)
      .populate<{ userId: IUser }>(
        "userId",
        "fullName email role isVerified isProfileComplete"
      )
      .populate<{ approvedBy: IUser }>("approvedBy", "fullName");

    if (!member) {
      res.status(404).json({
        success: false,
        message: "Member not found",
      });
      return;
    }

    // Check if user data exists
    if (!member.userId) {
      res.status(404).json({
        success: false,
        message: "Associated user not found",
      });
      return;
    }

    // Now TypeScript knows userId and approvedBy are populated
    const populatedMember = member as PopulatedMember;

    // Construct response data using your types
    const responseData = {
      user: {
        id: populatedMember.userId._id,
        fullName: populatedMember.userId.fullName,
        email: populatedMember.userId.email,
        role: populatedMember.userId.role,
        isVerified: populatedMember.userId.isVerified,
        isProfileComplete: populatedMember.userId.isProfileComplete,
      },
      profile: {
        address: populatedMember.address || null,
        phoneNumber: populatedMember.phoneNumber || null,
        dateOfBirth: populatedMember.dateOfBirth || null,
        gender: populatedMember.gender || null,
        whyJoin: populatedMember.whyJoin || null,
        memberStatus: populatedMember.memberStatus,
        membershipId: populatedMember.membershipId || null,
        approvedBy: populatedMember.approvedBy?.fullName || null,
        approvedAt: populatedMember.approvedAt || null,
        rejectionReason: populatedMember.rejectionReason || null,
      },
    };

    res.status(200).json({
      success: true,
      message: "Member retrieved successfully",
      data: responseData,
    });
  } catch (error: any) {
    console.error("Get member by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve member",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
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
        approvedAt: new Date(),
      },
      { new: true }
    )
      .populate("userId", "email fullName profilePic")
      .populate("approvedBy", "fullName email");

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

// Get Dashboard Stats
export const getDashboardStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Execute only the count queries we need (7 queries instead of 9)
    const [
      totalMembers,
      pendingMembers,
      rejectedMembers,
      totalApplications,
      totalUsers,
      verifiedUsers,
      unverifiedUsers,
    ] = await Promise.all([
      // Member statistics
      Member.countDocuments({ memberStatus: "approved" }),
      Member.countDocuments({ memberStatus: "pending" }),
      Member.countDocuments({ memberStatus: "rejected" }),
      Member.countDocuments(), // All member applications

      // User statistics
      User.countDocuments(), // All users
      User.countDocuments({ isVerified: true }),
      User.countDocuments({ isVerified: false }),
    ]);

    console.log(pendingMembers);
    res.status(200).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: {
        overview: {
          totalMembers,
          pendingMembers,
          rejectedMembers,
          totalApplications,
          totalUsers,
          verifiedUsers,
          unverifiedUsers,
        },
        // Simplified response - only sending counts
        members: {
          total: totalMembers,
        },
        users: {
          total: totalUsers,
        },
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard stats",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
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

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;

    const query: any = {};

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find(
      query,
      "fullName email role isVerified createdAt updatedAt isProfileComplete"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    console.log(users);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: users.length,
          totalUsers: total,
        },
      },
    });
  } catch (error: any) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

export const DeleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const adminUser = req.user as IUser;
    if (!adminUser || adminUser.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
      return;
    }

    // Find user first to get details
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Prevent admin from revoking themselves
    if (user._id.toString() === adminUser._id.toString()) {
      res.status(400).json({
        success: false,
        message: "Cannot revoke your own account",
      });
      return;
    }

    // Prevent revoking other admins (optional security measure)
    if (user.role === "admin") {
      res.status(400).json({
        success: false,
        message: "Cannot revoke admin accounts",
      });
      return;
    }

    // Use transaction to ensure data integrity
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete member profile if exists
        await Member.findOneAndDelete({ userId }, { session });

        // TODO: Delete other related data here
        // - Delete payments/donations
        // - Delete user logs/activities
        // - Delete uploaded files/documents

        // Finally delete the user
        await User.findByIdAndDelete(userId, { session });
      });

      await session.commitTransaction();

      res.status(200).json({
        success: true,
        message: "User and all related data have been permanently deleted",
        data: {
          deletedUser: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            deletedAt: new Date(),
            deletedBy: adminUser.fullName,
          },
        },
      });
    } catch (transactionError) {
      await session.abortTransaction();
      throw transactionError;
    } finally {
      session.endSession();
    }
  } catch (error: any) {
    console.error("Revoke user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to revoke user",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};
