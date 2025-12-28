import { Users, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { getStatusBadge } from "@/utils/adminUtils";
import type { Member } from "@/types";
import { cn } from "@/lib/utils";

type MemberStatusFilter = "all" | "approved" | "rejected";

interface MembersListProps {
  members: Member[];
  onMemberClick: (memberId: string) => void;
  loading: boolean;
  statusFilter: MemberStatusFilter;
  onStatusFilterChange: (filter: MemberStatusFilter) => void;
}

export const MembersList = ({
  members,
  onMemberClick,
  loading,
  statusFilter,
  onStatusFilterChange,
}: MembersListProps) => {
  // Calculate counts
  const approvedCount = members.filter(
    (m) => m.memberStatus === "approved"
  ).length;
  const rejectedCount = members.filter(
    (m) => m.memberStatus === "rejected"
  ).length;

  // Filter members based on status
  const filteredMembers =
    statusFilter === "all"
      ? members
      : members.filter((m) => m.memberStatus === statusFilter);

  const filterTabs: {
    value: MemberStatusFilter;
    label: string;
    count: number;
  }[] = [
    { value: "all", label: "All", count: members.length },
    { value: "approved", label: "Approved", count: approvedCount },
    { value: "rejected", label: "Rejected", count: rejectedCount },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onStatusFilterChange(tab.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              statusFilter === tab.value
                ? tab.value === "approved"
                  ? "bg-india-green-100 text-india-green-700 border border-india-green-300"
                  : tab.value === "rejected"
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
            )}
          >
            {tab.value === "approved" && <CheckCircle className="w-4 h-4" />}
            {tab.value === "rejected" && <XCircle className="w-4 h-4" />}
            <span>{tab.label}</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-semibold",
                statusFilter === tab.value
                  ? tab.value === "approved"
                    ? "bg-india-green-200 text-india-green-800"
                    : tab.value === "rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-slate-600 text-white"
                  : "bg-slate-200 text-slate-700"
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-india-green-50 rounded-lg border border-india-green-200">
          <CheckCircle className="w-4 h-4 text-india-green-600" />
          <span className="text-india-green-700">
            <span className="font-semibold">{approvedCount}</span> Approved
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200">
          <XCircle className="w-4 h-4 text-red-600" />
          <span className="text-red-700">
            <span className="font-semibold">{rejectedCount}</span> Rejected
          </span>
        </div>
      </div>

      {/* Members List */}
      {filteredMembers.length === 0 && !loading ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">
            {statusFilter === "all"
              ? "No members found"
              : `No ${statusFilter} members found`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              onClick={() => onMemberClick(member._id)}
              className="bg-slate-50 hover:bg-india-green-50/50 rounded-xl p-4 cursor-pointer transition-colors duration-200 border border-slate-200 hover:border-india-green-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {member.userId?.fullName || "Unknown User"}
                  </h3>
                  <p className="text-slate-600">{member.userId?.email}</p>
                  {member.membershipId && (
                    <p className="text-sm text-slate-500 font-mono">
                      ID: {member.membershipId}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                      member.memberStatus
                    )}`}
                  >
                    {member.memberStatus.toUpperCase()}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
