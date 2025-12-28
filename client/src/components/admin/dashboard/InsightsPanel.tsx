import { MemberStatusChart } from "./MemberStatusChart";
import { UserVerificationChart } from "./UserVerificationChart";

interface InsightsPanelProps {
  memberStats: {
    approved: number;
    pending: number;
    rejected: number;
  };
  userStats: {
    verified: number;
    unverified: number;
  };
  loading?: boolean;
}

export function InsightsPanel({
  memberStats,
  userStats,
  loading = false,
}: InsightsPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MemberStatusChart
        approved={memberStats.approved}
        pending={memberStats.pending}
        rejected={memberStats.rejected}
        loading={loading}
      />
      <UserVerificationChart
        verified={userStats.verified}
        unverified={userStats.unverified}
        loading={loading}
      />
    </div>
  );
}
