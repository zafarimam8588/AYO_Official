import type { Address } from "./common";

export interface ArchivedUserProfile {
  address?: Address;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  whyJoin?: string;
  idProof?: string;
  memberStatus?: "not_submitted" | "pending" | "approved" | "rejected";
  membershipId?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  profileCreatedAt?: string;
  profileUpdatedAt?: string;
}

export interface ArchivedUser {
  _id: string;
  originalUserId: string;
  email: string;
  fullName: string;
  role: "member" | "admin";
  googleId?: string;
  profilePic?: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  userCreatedAt: string;
  userUpdatedAt: string;
  profile?: ArchivedUserProfile;
  archivedAt: string;
  archivedBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  archiveReason?: string;
  archiveSource: "admin_action" | "user_request" | "system";
  createdAt: string;
  updatedAt: string;
}

export interface ArchivedUsersResponse {
  success: boolean;
  message?: string;
  data: {
    archivedUsers: ArchivedUser[];
    pagination: {
      current: number;
      total: number;
      count: number;
      totalArchivedUsers: number;
    };
  };
}

export interface ArchivedUserResponse {
  success: boolean;
  message?: string;
  data: ArchivedUser;
}
