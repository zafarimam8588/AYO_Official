import { Request, Response } from "express";
import mongoose from "mongoose";

import { AccountDeletionRequest } from "../models/AccountDeleteModal";
import ArchivedUser from "../models/ArchivedUserModal";
import OTP from "../models/OTPModel";
import Member from "../models/ProfileModel";
import SubscribedEmail from "../models/SubscribedEmailModal";
import User from "../models/UserModal";
import EmailService from "../services/emailService";
import { IArchivedUser, IMemberProfile, IUser } from "../types";
import { generateMembershipId } from "../utils/membershipHelper";

export const getAllMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, search } = req.query;
    // Add pagination bounds to prevent DoS
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

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

    const skip = (page - 1) * limit;

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "fullName email");

    const total = await Member.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: {
        members,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: members.length,
          totalMembers: total,
        },
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve members",
    });
  }
};

// Define populated member interface using your existing types
interface PopulatedMember extends Omit<
  IMemberProfile,
  "userId" | "approvedBy"
> {
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
      .populate<{
        userId: IUser;
      }>("userId", "fullName email role isVerified isProfileComplete")
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
    // Execute only the count queries we need
    const [
      totalMembers,
      pendingMembers,
      rejectedMembers,
      totalApplications,
      totalUsers,
      verifiedUsers,
      unverifiedUsers,
      totalSubscribedEmails,
      totalArchivedUsers,
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

      // Subscribed emails statistics
      SubscribedEmail.countDocuments(), // All subscribed emails

      // Archived users statistics
      ArchivedUser.countDocuments(),
    ]);

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
          totalSubscribedEmails,
          totalArchivedUsers,
        },
        // Simplified response - only sending counts
        members: {
          total: totalMembers,
        },
        users: {
          total: totalUsers,
        },
        emails: {
          total: totalSubscribedEmails,
        },
        archivedUsers: {
          total: totalArchivedUsers,
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

// Approve user deletion request - archives user instead of hard delete
export const getPendingDeletionRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const adminUser = req.user as IUser;
    if (
      !adminUser ||
      (adminUser.role !== "admin" && adminUser.role !== "viewer")
    ) {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { requestId } = req.params;

    const deletionRequest =
      await AccountDeletionRequest.findById(requestId).populate("userId");

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

    const userToArchive = deletionRequest.userId as unknown as IUser;
    if (!userToArchive) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Find associated profile
    const profile = await Member.findOne({ userId: userToArchive._id });

    // Start transaction for archiving
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Build archived user data
        const archivedUserData: Partial<IArchivedUser> = {
          originalUserId: userToArchive._id,
          email: userToArchive.email,
          fullName: userToArchive.fullName,
          role: userToArchive.role,
          googleId: userToArchive.googleId,
          profilePic: userToArchive.profilePic,
          isVerified: userToArchive.isVerified,
          isProfileComplete: userToArchive.isProfileComplete,
          userCreatedAt: userToArchive.createdAt,
          userUpdatedAt: userToArchive.updatedAt,
          archivedAt: new Date(),
          archivedBy: adminUser._id,
          archiveReason:
            deletionRequest.reason || "User requested account deletion",
          archiveSource: "user_request",
        };

        // Include profile data if exists
        if (profile) {
          archivedUserData.profile = {
            address: profile.address,
            phoneNumber: profile.phoneNumber,
            dateOfBirth: profile.dateOfBirth,
            gender: profile.gender as "Male" | "Female" | "Other",
            whyJoin: profile.whyJoin,
            idProof: profile.idProof,
            memberStatus: profile.memberStatus,
            membershipId: profile.membershipId,
            approvedBy: profile.approvedBy,
            approvedAt: profile.approvedAt,
            rejectionReason: profile.rejectionReason,
            profileCreatedAt: profile.createdAt,
            profileUpdatedAt: profile.updatedAt,
          };
        }

        // Save to ArchivedUsers collection
        await ArchivedUser.create([archivedUserData], { session });

        // Update deletion request status
        await AccountDeletionRequest.findByIdAndUpdate(
          requestId,
          {
            deletionStatus: "approved",
            processedBy: adminUser._id,
          },
          { session }
        );

        // Delete from active collections
        await Promise.all([
          User.findByIdAndDelete(userToArchive._id, { session }),
          Member.findOneAndDelete({ userId: userToArchive._id }, { session }),
          OTP.deleteMany({ email: userToArchive.email }, { session }),
          AccountDeletionRequest.deleteMany(
            { userId: userToArchive._id, _id: { $ne: requestId } },
            { session }
          ),
        ]);
      });

      res.status(200).json({
        success: true,
        message:
          "Account deletion approved - user has been archived successfully",
      });
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
    const { search, role } = req.query;
    // Add pagination bounds to prevent DoS
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

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

    const skip = (page - 1) * limit;

    const users = await User.find(
      query,
      "fullName email role isVerified createdAt updatedAt isProfileComplete"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
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

export const archiveUser = async (
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
    const { archiveReason } = req.body;

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

    // Prevent admin from archiving themselves
    if (user._id.toString() === adminUser._id.toString()) {
      res.status(400).json({
        success: false,
        message: "Cannot archive your own account",
      });
      return;
    }

    // Prevent archiving other admins
    if (user.role === "admin") {
      res.status(400).json({
        success: false,
        message: "Cannot archive admin accounts",
      });
      return;
    }

    // Find associated profile
    const profile = await Member.findOne({ userId });

    // Use transaction to ensure data integrity
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Build archived user data
        const archivedUserData: Partial<IArchivedUser> = {
          originalUserId: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          googleId: user.googleId,
          profilePic: user.profilePic,
          isVerified: user.isVerified,
          isProfileComplete: user.isProfileComplete,
          userCreatedAt: user.createdAt,
          userUpdatedAt: user.updatedAt,
          archivedAt: new Date(),
          archivedBy: adminUser._id,
          archiveReason: archiveReason?.trim() || undefined,
          archiveSource: "admin_action",
        };

        // Include profile data if exists
        if (profile) {
          archivedUserData.profile = {
            address: profile.address,
            phoneNumber: profile.phoneNumber,
            dateOfBirth: profile.dateOfBirth,
            gender: profile.gender as "Male" | "Female" | "Other",
            whyJoin: profile.whyJoin,
            idProof: profile.idProof,
            memberStatus: profile.memberStatus,
            membershipId: profile.membershipId,
            approvedBy: profile.approvedBy,
            approvedAt: profile.approvedAt,
            rejectionReason: profile.rejectionReason,
            profileCreatedAt: profile.createdAt,
            profileUpdatedAt: profile.updatedAt,
          };
        }

        // Save to ArchivedUsers collection
        await ArchivedUser.create([archivedUserData], { session });

        // Delete from active collections
        await Promise.all([
          User.findByIdAndDelete(userId, { session }),
          Member.findOneAndDelete({ userId }, { session }),
          OTP.deleteMany({ email: user.email }, { session }),
          AccountDeletionRequest.deleteMany({ userId }, { session }),
        ]);
      });

      res.status(200).json({
        success: true,
        message: "User has been archived successfully",
        data: {
          archivedUser: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            archivedAt: new Date(),
            archivedBy: adminUser.fullName,
            archiveReason: archiveReason?.trim() || null,
          },
        },
      });
    } finally {
      session.endSession();
    }
  } catch (error: any) {
    console.error("Archive user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to archive user",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// Get all archived users with pagination
export const getArchivedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user || (user.role !== "admin" && user.role !== "viewer")) {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { page = 1, limit = 50, search } = req.query;

    const query: any = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { "profile.membershipId": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const archivedUsers = await ArchivedUser.find(query)
      .sort({ archivedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("archivedBy", "fullName email");

    const total = await ArchivedUser.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Archived users retrieved successfully",
      data: {
        archivedUsers,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: archivedUsers.length,
          totalArchivedUsers: total,
        },
      },
    });
  } catch (error: any) {
    console.error("Get archived users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve archived users",
      error: error.message,
    });
  }
};

// Get single archived user by ID
export const getArchivedUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user || (user.role !== "admin" && user.role !== "viewer")) {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    const { archivedUserId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(archivedUserId)) {
      res.status(400).json({
        success: false,
        message: "Invalid archived user ID format",
      });
      return;
    }

    const archivedUser = await ArchivedUser.findById(archivedUserId).populate(
      "archivedBy",
      "fullName email"
    );

    if (!archivedUser) {
      res.status(404).json({
        success: false,
        message: "Archived user not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Archived user retrieved successfully",
      data: archivedUser,
    });
  } catch (error: any) {
    console.error("Get archived user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve archived user",
      error: error.message,
    });
  }
};
