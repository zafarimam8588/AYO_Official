import { useState, useCallback } from "react";
import { adminService } from "@/services/adminService";
import type { Member, UserData } from "@/types";
import toast from "react-hot-toast";

export const useAdminData = (token: string | null) => {
  const [dashboardStats, setDashboardStats] = useState({
    overview: {
      totalMembers: 0,
      pendingMembers: 0,
      rejectedMembers: 0,
      totalApplications: 0,
      totalUsers: 0,
      verifiedUsers: 0,
      unverifiedUsers: 0,
      totalSubscribedEmails: 0,
    },
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchDashboardStats = useCallback(async () => {
    if (!token) return;

    setStatsLoading(true);
    try {
      const data = await adminService.getDashboardStats(token);
      setDashboardStats({
        overview: {
          ...data.overview,
          totalSubscribedEmails: data.overview.totalSubscribedEmails || 0,
        },
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  const fetchAllMembers = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const data = await adminService.getAllMembers(token);
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const data = await adminService.getAllUsers(token);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchPendingMembers = useCallback(async () => {
    if (!token) return;

    try {
      const data = await adminService.getPendingMembers(token);
      setPendingMembers(data);
    } catch (error) {
      console.error("Failed to fetch pending members:", error);
    }
  }, [token]);

  const approveMember = useCallback(
    async (memberId: string, message?: string) => {
      try {
        await adminService.approveMember(token!, memberId, message);
        await Promise.all([fetchPendingMembers(), fetchDashboardStats()]);
        toast.success("Member approved successfully!");
      } catch (error: any) {
        toast.error(
          error.message || "Failed to approve member. Please try again."
        );
      }
    },
    [token, fetchPendingMembers, fetchDashboardStats]
  );

  const rejectMember = useCallback(
    async (memberId: string, reason: string) => {
      if (!reason || reason.trim().length === 0) return;

      try {
        await adminService.rejectMember(token!, memberId, reason.trim());
        await Promise.all([fetchPendingMembers(), fetchDashboardStats()]);
        toast.success("Member rejected successfully!");
      } catch (error: any) {
        toast.error(
          error.message || "Failed to reject member. Please try again."
        );
      }
    },
    [token, fetchPendingMembers, fetchDashboardStats]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      try {
        await adminService.deleteUser(token!, userId);
        await Promise.all([fetchUsers(), fetchDashboardStats()]);
        toast.success("User deleted successfully!");
      } catch (error: any) {
        toast.error(
          error.message || "Failed to delete user. Please try again."
        );
        throw error; // Re-throw to allow component to handle it
      }
    },
    [token, fetchUsers, fetchDashboardStats]
  );

  return {
    dashboardStats,
    members,
    users,
    pendingMembers,
    loading,
    statsLoading,
    fetchDashboardStats,
    fetchAllMembers,
    fetchUsers,
    fetchPendingMembers,
    approveMember,
    rejectMember,
    deleteUser,
  };
};
