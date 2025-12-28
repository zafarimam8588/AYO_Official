import { useState, useCallback } from "react";
import { adminService } from "@/services/adminService";
import type { Member, UserData, ArchivedUser } from "@/types";
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
      totalArchivedUsers: 0,
    },
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [archivedUsers, setArchivedUsers] = useState<ArchivedUser[]>([]);
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchDashboardStats = useCallback(async () => {
    if (!token) {
      return;
    }

    setStatsLoading(true);
    try {
      const data = await adminService.getDashboardStats(token);
      setDashboardStats({
        overview: {
          ...data.overview,
          totalSubscribedEmails: data.overview.totalSubscribedEmails || 0,
          totalArchivedUsers: data.overview.totalArchivedUsers || 0,
        },
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      toast.error("Failed to load dashboard stats");
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  const fetchAllMembers = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const data = await adminService.getAllMembers(token);
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const data = await adminService.getAllUsers(token);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchPendingMembers = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const data = await adminService.getPendingMembers(token);
      setPendingMembers(data);
    } catch (error) {
      console.error("Failed to fetch pending members:", error);
      toast.error("Failed to load pending members");
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
      if (!reason || reason.trim().length === 0) {
        return;
      }

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

  const archiveUser = useCallback(
    async (userId: string, archiveReason?: string) => {
      try {
        await adminService.archiveUser(token!, userId, archiveReason);
        await Promise.all([fetchUsers(), fetchDashboardStats()]);
        toast.success("User archived successfully!");
      } catch (error: any) {
        toast.error(
          error.message || "Failed to archive user. Please try again."
        );
        throw error; // Re-throw to allow component to handle it
      }
    },
    [token, fetchUsers, fetchDashboardStats]
  );

  const fetchArchivedUsers = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const data = await adminService.getArchivedUsers(token);
      setArchivedUsers(data);
    } catch (error) {
      console.error("Failed to fetch archived users:", error);
      toast.error("Failed to load archived users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  return {
    dashboardStats,
    members,
    users,
    archivedUsers,
    pendingMembers,
    loading,
    statsLoading,
    fetchDashboardStats,
    fetchAllMembers,
    fetchUsers,
    fetchArchivedUsers,
    fetchPendingMembers,
    approveMember,
    rejectMember,
    archiveUser,
  };
};
