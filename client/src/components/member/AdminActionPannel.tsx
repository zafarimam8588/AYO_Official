import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { MemberProfile } from "@/types";
import { RejectMemberModal } from "@/components/admin/RejectMemberModal";
import { ApproveMemberModal } from "@/components/admin/ApproveMemberModal";
import { useIsViewer } from "@/context/AdminContext";
import { showToast } from "@/lib/toast";

interface AdminActionPanelProps {
  profile: MemberProfile;
  onApprove: (message?: string) => void;
  onReject: (reason: string) => void;
  submitting: boolean;
  memberName?: string;
}

export const AdminActionPanel = ({
  profile,
  onApprove,
  onReject,
  submitting,
  memberName,
}: AdminActionPanelProps) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const isViewer = useIsViewer();

  const canApprove = profile.memberStatus === "pending";
  const canReject = profile.memberStatus === "pending";

  const handleApproveClick = () => {
    if (isViewer) {
      showToast.info("You have view-only access");
      return;
    }
    setIsApproveModalOpen(true);
  };

  const handleApproveConfirm = (message?: string) => {
    onApprove(message);
    setIsApproveModalOpen(false);
  };

  const handleRejectClick = () => {
    if (isViewer) {
      showToast.info("You have view-only access");
      return;
    }
    setIsRejectModalOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    onReject(reason);
    setIsRejectModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-saffron-400 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Admin Actions
        </h2>

        <div className="space-y-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.memberStatus === "approved"
                    ? "bg-india-green-100 text-india-green-700"
                    : profile.memberStatus === "pending"
                      ? "bg-saffron-100 text-saffron-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {profile.memberStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {canApprove && (
            <button
              onClick={handleApproveClick}
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-india-green-500 text-white hover:bg-india-green-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Approve Member</span>
                </>
              )}
            </button>
          )}

          {canReject && (
            <button
              onClick={handleRejectClick}
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span>Reject Member</span>
                </>
              )}
            </button>
          )}

          {profile.memberStatus === "approved" && (
            <p className="text-sm text-india-green-700 bg-india-green-50 border border-india-green-200 rounded-lg p-3">
              Member status: Approved
            </p>
          )}

          {profile.memberStatus === "rejected" && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              Member status: Rejected
            </p>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      <ApproveMemberModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApproveConfirm}
        submitting={submitting}
        memberName={memberName}
      />

      {/* Reject Modal */}
      <RejectMemberModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
        submitting={submitting}
        memberName={memberName}
      />
    </>
  );
};
