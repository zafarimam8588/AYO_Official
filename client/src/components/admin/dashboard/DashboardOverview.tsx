import type { Member } from "@/types";
import { StatsGrid } from "./StatsGrid";
import { PendingApprovalsPanel } from "./PendingApprovalsPanel";
import { QuickActionsPanel } from "./QuickActionsPanel";
import { InsightsPanel } from "./InsightsPanel";

type ViewType = "dashboard" | "members" | "users" | "emails" | "pictures";

interface DashboardStats {
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
}

interface DashboardOverviewProps {
  dashboardStats: DashboardStats;
  pendingMembers: Member[];
  totalPictures: number;
  statsLoading: boolean;
  picturesLoading: boolean;
  submitting: boolean;
  onMemberClick: (memberId: string) => void;
  onApproveMember: (memberId: string, message?: string) => void;
  onRejectMember: (memberId: string, reason: string) => void;
  onViewChange: (view: ViewType) => void;
  onMembersClick: () => void;
  onUsersClick: () => void;
  onEmailsClick: () => void;
  unreadMessages?: number;
}

export function DashboardOverview({
  dashboardStats,
  pendingMembers,
  totalPictures,
  statsLoading,
  picturesLoading,
  submitting,
  onMemberClick,
  onApproveMember,
  onRejectMember,
  onViewChange,
  onMembersClick,
  onUsersClick,
  onEmailsClick,
  unreadMessages = 0,
}: DashboardOverviewProps) {
  const { overview } = dashboardStats;

  return (
    <div className="space-y-6">
      {/* Stats Grid - Full Width */}
      <StatsGrid
        totalMembers={overview.totalMembers}
        pendingMembers={overview.pendingMembers}
        rejectedMembers={overview.rejectedMembers}
        totalUsers={overview.totalUsers}
        totalSubscribedEmails={overview.totalSubscribedEmails}
        totalPictures={totalPictures}
        statsLoading={statsLoading}
        picturesLoading={picturesLoading}
      />

      {/* Main Content Grid: Pending Approvals (2/3) + Quick Actions (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Approvals - Most Prominent */}
        <div className="lg:col-span-8">
          <PendingApprovalsPanel
            pendingMembers={pendingMembers}
            onMemberClick={onMemberClick}
            onApproveMember={onApproveMember}
            onRejectMember={onRejectMember}
            submitting={submitting}
            loading={statsLoading}
          />
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-4">
          <QuickActionsPanel
            onViewChange={onViewChange}
            onMembersClick={onMembersClick}
            onUsersClick={onUsersClick}
            onEmailsClick={onEmailsClick}
            unreadMessages={unreadMessages}
          />
        </div>
      </div>

      {/* Insights Panel - Charts */}
      <InsightsPanel
        memberStats={{
          approved: overview.totalMembers,
          pending: overview.pendingMembers,
          rejected: overview.rejectedMembers,
        }}
        userStats={{
          verified: overview.verifiedUsers,
          unverified: overview.unverifiedUsers,
        }}
        loading={statsLoading}
      />
    </div>
  );
}
