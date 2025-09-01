import type { Address } from "./common";
import type { StoredUser } from "./auth";

export interface Member {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  memberStatus: "approved" | "pending" | "rejected" | "not_submitted";
  membershipId?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: Address;
  whyJoin?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface MemberProfile {
  address: Address | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  whyJoin: string | null;
  memberStatus: "approved" | "pending" | "rejected" | "not_submitted";
  membershipId: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
}

export interface MemberData {
  user: StoredUser;
  profile: MemberProfile;
}

export interface MemberResponse {
  success: boolean;
  message?: string;
  data: MemberData;
}

export interface MembersResponse {
  success: boolean;
  message?: string;
  data: {
    members: Member[];
    pagination: {
      current: number;
      total: number;
      count: number;
      totalMembers: number;
    };
  };
}

export interface SharedMemberDashboardProps {
  isAdmin?: boolean;
}
