import { AlertTriangle, CheckCircle, Users, ChevronRight } from "lucide-react";
import type { Member } from "@/types";

interface PendingApprovalsProps {
  pendingMembers: Member[];
  onMemberClick: (memberId: string) => void;
  onApproveMember: (memberId: string) => void;
  onRejectMember: (memberId: string) => void;
}

export const PendingApprovals = ({
  pendingMembers,
  onMemberClick,
  onApproveMember,
  onRejectMember,
}: PendingApprovalsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
          <p className="text-gray-600">Members waiting for your review</p>
        </div>
      </div>

      {pendingMembers.length === 0 ? (
        <div className="text-center py-8">
          <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-500 font-medium">
            All caught up! No pending approvals.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingMembers.map((member) => (
            <div
              key={member._id}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => onMemberClick(member._id)}
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {member.userId?.fullName}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {member.userId?.email}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onApproveMember(member._id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onRejectMember(member._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
