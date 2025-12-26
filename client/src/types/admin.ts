export interface DashboardStatsResponse {
  success: boolean;
  message?: string;
  data: {
    overview: {
      totalMembers: number;
      pendingMembers: number;
      rejectedMembers: number;
      totalApplications: number;
      totalUsers: number;
      verifiedUsers: number;
      unverifiedUsers: number;
      totalSubscribedEmails: number;
    };
    members: {
      total: number;
    };
    users: {
      total: number;
    };
    emails: {
      total: number;
    };
    lastUpdated: string;
  };
}
