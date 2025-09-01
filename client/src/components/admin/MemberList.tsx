import { Users, ChevronRight } from "lucide-react";
import { getStatusBadge } from "@/utils/adminUtils";
import type { Member } from "@/types";

interface MembersListProps {
  members: Member[];
  onMemberClick: (memberId: string) => void;
  loading: boolean;
}

export const MembersList = ({
  members,
  onMemberClick,
  loading,
}: MembersListProps) => {
  if (members.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No members found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member._id}
          onClick={() => onMemberClick(member._id)}
          className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 cursor-pointer transition-colors duration-200 border border-gray-200 hover:border-green-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {member.userId?.fullName || "Unknown User"}
              </h3>
              <p className="text-gray-600">{member.userId?.email}</p>
              {member.membershipId && (
                <p className="text-sm text-gray-500 font-mono">
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
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
