import axios from "axios";
import type {
  DashboardStatsResponse,
  MembersResponse,
  UsersResponse,
  ActionResponse,
  AxiosErrorResponse,
} from "@/types";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

class AdminService {
  private getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async getDashboardStats(token: string) {
    try {
      const { data } = await axios.get<DashboardStatsResponse>(
        `${BASE_URL}/api/admin/dashboard/stats`,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch dashboard stats");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosErrorResponse<DashboardStatsResponse>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch dashboard stats"
      );
    }
  }

  async getAllMembers(token: string) {
    try {
      const { data } = await axios.get<MembersResponse>(
        `${BASE_URL}/api/admin/members?limit=50&page=1`,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch members");
      }

      return data.data.members;
    } catch (err) {
      const error = err as AxiosErrorResponse<MembersResponse>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch members"
      );
    }
  }

  async getAllUsers(token: string) {
    try {
      const { data } = await axios.get<UsersResponse>(
        `${BASE_URL}/api/admin/users?limit=50&page=1`,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch users");
      }

      return data.data.users;
    } catch (err) {
      const error = err as AxiosErrorResponse<UsersResponse>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users"
      );
    }
  }

  async getPendingMembers(token: string) {
    try {
      const { data } = await axios.get<MembersResponse>(
        `${BASE_URL}/api/admin/members?status=pending&limit=10&page=1`,
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch pending members");
      }

      return data.data.members;
    } catch (err) {
      const error = err as AxiosErrorResponse<MembersResponse>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch pending members"
      );
    }
  }

  async approveMember(token: string, memberId: string) {
    try {
      const { data } = await axios.post<ActionResponse>(
        `${BASE_URL}/api/admin/members/${memberId}/approve`,
        {},
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to approve member");
      }

      return data;
    } catch (err) {
      const error = err as AxiosErrorResponse<ActionResponse>;
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
      const error = err as AxiosErrorResponse<ActionResponse>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to reject member"
      );
    }
  }

  async deleteUser(token: string, userId: string) {
    try {
      const { data } = await axios.post<ActionResponse>(
        `${BASE_URL}/api/admin/users/${userId}/delete-user`,
        {},
        { headers: this.getAuthHeaders(token) }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to revoke user");
      }

      return data;
    } catch (err) {
      const error = err as AxiosErrorResponse<ActionResponse>;
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to revoke user"
      );
    }
  }
}

export const adminService = new AdminService();
