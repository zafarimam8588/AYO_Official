import { useState, useCallback } from "react";
import { adminService } from "@/services/adminService";
import type { Member, UserData } from "@/types";

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
      setDashboardStats(data);
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
    async (memberId: string) => {
      if (!window.confirm("Are you sure you want to approve this member?"))
        return;

      try {
        await adminService.approveMember(token!, memberId);
        await Promise.all([fetchPendingMembers(), fetchDashboardStats()]);
        alert("Member approved successfully!");
      } catch (error: any) {
        alert(error.message || "Failed to approve member. Please try again.");
      }
    },
    [token, fetchPendingMembers, fetchDashboardStats]
  );

  const rejectMember = useCallback(
    async (memberId: string) => {
      const reason = window.prompt("Please enter a reason for rejection:");
      if (!reason || reason.trim().length === 0) return;

      try {
        await adminService.rejectMember(token!, memberId, reason.trim());
        await Promise.all([fetchPendingMembers(), fetchDashboardStats()]);
        alert("Member rejected successfully!");
      } catch (error: any) {
        alert(error.message || "Failed to reject member. Please try again.");
      }
    },
    [token, fetchPendingMembers, fetchDashboardStats]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      if (
        !window.confirm(
          "Are you sure you want to revoke this user? This action cannot be undone."
        )
      )
        return;

      try {
        await adminService.deleteUser(token!, userId);
        await Promise.all([fetchUsers(), fetchDashboardStats()]);
        alert("User revoked successfully!");
      } catch (error: any) {
        alert(error.message || "Failed to revoke user. Please try again.");
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
