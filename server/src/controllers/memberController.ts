// Validate date of birth (must be at least 18 years old) in next update
import { Request, Response } from "express";
import Member from "../models/ProfileModel";
import User from "../models/UserModal";
import { IUser } from "../types";

export const getMemberData = async (
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

    const user = req.user as IUser;

    // Get user data
    const dBuser = await User.findById(user._id).select("-password");

    if (!dBuser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Get member profile if exists
    const memberProfile = await Member.findOne({
      userId: user._id,
    }).populate("approvedBy", "fullName email");

    //  Always return profile object with consistent structure
    const profileData = memberProfile
      ? {
          id: memberProfile._id,
          address: memberProfile.address || null,
          phoneNumber: memberProfile.phoneNumber || null,
          dateOfBirth: memberProfile.dateOfBirth || null,
          gender: memberProfile.gender || null,
          whyJoin: memberProfile.whyJoin || null,
          idProof: memberProfile.idProof || null,
          memberStatus: memberProfile.memberStatus || "not_submitted",
          membershipId: memberProfile.membershipId || null,
          approvedBy: memberProfile.approvedBy
            ? (memberProfile.approvedBy as any).fullName
            : null,
          approvedAt: memberProfile.approvedAt || null,
          rejectionReason: memberProfile.rejectionReason || null,
          createdAt: memberProfile.createdAt || null,
          updatedAt: memberProfile.updatedAt || null,
        }
      : {
          //  Default structure when no profile exists
          id: null,
          address: null,
          phoneNumber: null,
          dateOfBirth: null,
          gender: null,
          whyJoin: null,
          idProof: null,
          memberStatus: "not_submitted",
          membershipId: null,
          approvedBy: null,
          approvedAt: null,
          rejectionReason: null,
          createdAt: null,
          updatedAt: null,
        };

    res.status(200).json({
      success: true,
      message: "Member data retrieved successfully",
      data: {
        user: {
          id: dBuser._id,
          email: dBuser.email,
          fullName: dBuser.fullName,
          role: dBuser.role,
          profilePic: dBuser.profilePic,
          isProfileComplete: dBuser.isProfileComplete,
          createdAt: dBuser.createdAt,
        },
        profile: profileData,
      },
    });
  } catch (error: any) {
    console.error("Get member data error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve member data",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

export const updateMemberProfile = async (
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

    const { address, phoneNumber, dateOfBirth, gender, whyJoin, idProof } =
      req.body;
    const user = req.user as IUser;

    //Check if user exists (simplified check)
    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Validate required fields
    const missingFields = [];
    if (!address) missingFields.push("address");
    if (!phoneNumber) missingFields.push("phoneNumber");
    if (!dateOfBirth) missingFields.push("dateOfBirth");
    if (!gender) missingFields.push("gender");
    if (!whyJoin) missingFields.push("whyJoin");

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        missingFields,
      });
      return;
    }

    //  Validate address structure
    if (
      address &&
      (!address.street || !address.city || !address.state || !address.pincode)
    ) {
      res.status(400).json({
        success: false,
        message: "Address must include street, city, state, and pincode",
      });
      return;
    }

    //  Check phone number uniqueness
    const existingPhone = await Member.findOne({
      phoneNumber,
      userId: { $ne: user._id },
    });

    if (existingPhone) {
      res.status(400).json({
        success: false,
        message: "Phone number is already registered with another account",
      });
      return;
    }

    //  Find existing profile OR prepare for creation
    const existingProfile = await Member.findOne({ userId: user._id });

    //  Don't allow updates if already approved
    if (existingProfile && existingProfile.memberStatus === "approved") {
      res.status(400).json({
        success: false,
        message:
          "Cannot update profile after approval. Contact admin for changes.",
      });
      return;
    }

    // Prepare update data
    const updateData: any = {
      address,
      phoneNumber,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      whyJoin: whyJoin.trim(),
    };

    if (idProof) updateData.idProof = idProof;

    //  Reset status if was rejected
    if (existingProfile && existingProfile.memberStatus === "rejected") {
      updateData.memberStatus = "not_submitted";
      updateData.rejectionReason = undefined;
    }

    let updatedProfile;
    let isNewProfile = false;

    if (!existingProfile) {
      //  CREATE new profile
      updateData.userId = user._id;
      updateData.memberStatus = "not_submitted";

      updatedProfile = new Member(updateData);
      await updatedProfile.save();
      isNewProfile = true;
    } else {
      //  UPDATE existing profile
      updatedProfile = await Member.findOneAndUpdate(
        { userId: user._id },
        updateData,
        { new: true, runValidators: true }
      ).populate("userId", "fullName email");
    }

    if (!updatedProfile) {
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
      });
      return;
    }

    //  Update user's profile completion status
    await User.findByIdAndUpdate(user._id, { isProfileComplete: true });

    res.status(isNewProfile ? 201 : 200).json({
      success: true,
      message: isNewProfile
        ? "Member profile created successfully"
        : "Member profile updated successfully",
      data: {
        id: updatedProfile._id,
        userId: updatedProfile.userId,
        address: updatedProfile.address,
        phoneNumber: updatedProfile.phoneNumber,
        dateOfBirth: updatedProfile.dateOfBirth,
        gender: updatedProfile.gender,
        whyJoin: updatedProfile.whyJoin,
        idProof: updatedProfile.idProof,
        memberStatus: updatedProfile.memberStatus,
        membershipId: updatedProfile.membershipId,
        updatedAt: updatedProfile.updatedAt,
      },
    });
  } catch (error: any) {
    console.error("Update member data error:", error);

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

    if (error.code === 11000) {
      let message = "Duplicate data found";
      if (error.keyPattern?.phoneNumber) {
        message = "Phone number is already registered";
      }

      res.status(400).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to update member profile",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

export const submitMemberRequest = async (
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
    const user = req.user as IUser;
    // Find existing member profile
    const existingProfile = await Member.findOne({ userId: user._id });

    if (!existingProfile) {
      res.status(404).json({
        success: false,
        message:
          "Member profile not found.Redirect to route updateMemberProfile.",
      });
      return;
    }

    // Check current status
    if (existingProfile.memberStatus === "approved") {
      res.status(400).json({
        success: false,
        message: "You are already an approved member.",
      });
      return;
    }

    if (existingProfile.memberStatus === "pending") {
      res.status(400).json({
        success: false,
        message: "Your member request is already under review.",
      });
      return;
    }

    // Check if required details are filled (from updateMemberData)
    const missingFields = [];
    if (!existingProfile.address) missingFields.push("address");
    if (!existingProfile.phoneNumber) missingFields.push("phoneNumber");
    if (!existingProfile.dateOfBirth) missingFields.push("dateOfBirth");
    if (!existingProfile.gender) missingFields.push("gender");
    if (!existingProfile.whyJoin) missingFields.push("whyJoin");

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Please complete your profile first. Missing: ${missingFields.join(
          ", "
        )}`,
        action: "redirect_to_update_profile",
        missingFields,
      });
      return;
    }

    // Validate address structure
    if (
      existingProfile.address &&
      (!existingProfile.address.street ||
        !existingProfile.address.city ||
        !existingProfile.address.state ||
        !existingProfile.address.pincode)
    ) {
      res.status(400).json({
        success: false,
        message: "Please complete your address information first.",
        action: "redirect_to_update_profile",
      });
      return;
    }

    // Simply change status from 'not_submitted' or 'rejected' to 'pending'
    const updatedProfile = await Member.findOneAndUpdate(
      { userId: user._id },
      {
        memberStatus: "pending",
        rejectionReason: undefined, // Clear rejection reason if resubmitting
      },
      { new: true }
    );

    if (!updatedProfile) {
      res.status(404).json({
        success: false,
        message: "Failed to submit member request",
      });
      return;
    }

    // Update user's profile completion status
    await User.findByIdAndUpdate(user._id, { isProfileComplete: true });

    res.status(200).json({
      success: true,
      message:
        "Member request submitted successfully! Your application is under admin review.",
      data: {
        requestId: updatedProfile._id,
        memberStatus: updatedProfile.memberStatus, // "pending"
        submittedAt: updatedProfile.updatedAt,
      },
    });
  } catch (error: any) {
    console.error("Submit member request error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit member request",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};
