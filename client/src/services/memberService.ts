import axios, { AxiosError } from "axios";
import type {
  MemberResponse,
  ActionResponse,
  ProfileUpdateData,
} from "@/types";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

class MemberService {
  private getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async getMemberProfile(token: string) {
    try {
      const { data } = await axios.get<MemberResponse>(
        `${BASE_URL}/api/member/profile`,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to load member data");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load member data"
      );
    }
  }

  async getSpecificMemberProfile(token: string, memberId: string) {
    try {
      const { data } = await axios.get<MemberResponse>(
        `${BASE_URL}/api/admin/member/${memberId}`,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to load member data");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load member data"
      );
    }
  }

  async updateProfile(token: string, profileData: ProfileUpdateData) {
    try {
      const { data } = await axios.put<ActionResponse>(
        `${BASE_URL}/api/member/profile`,
        profileData,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  }

  async submitMemberRequest(token: string) {
    try {
      const { data } = await axios.post<ActionResponse>(
        `${BASE_URL}/api/member/submit-memberRequest`,
        {},
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to submit request");
      }

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit request"
      );
    }
  }

  async approveMember(token: string, memberId: string, message?: string) {
    try {
      const { data } = await axios.post<ActionResponse>(
        `${BASE_URL}/api/admin/members/${memberId}/approve`,
        message ? { approvalMessage: message } : {},
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to approve member");
      }

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to approve member"
      );
    }
  }

  async rejectMember(token: string, memberId: string, reason: string) {
    try {
      const { data } = await axios.post<ActionResponse>(
        `${BASE_URL}/api/admin/members/${memberId}/reject`,
        { rejectionReason: reason },
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to reject member");
      }

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to reject member"
      );
    }
  }

  async logout(token: string) {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, null, {
        headers: this.getAuthHeaders(token),
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
}

export const memberService = new MemberService();
