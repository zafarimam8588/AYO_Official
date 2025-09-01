import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import type { MemberProfile } from "@/types";

interface AdminActionPanelProps {
  profile: MemberProfile;
  onApprove: () => void;
  onReject: () => void;
  submitting: boolean;
}

export const AdminActionPanel = ({
  profile,
  onApprove,
  onReject,
  submitting,
}: AdminActionPanelProps) => {
  const canApprove = profile.memberStatus === "pending";
  const canReject = profile.memberStatus === "pending";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-400 hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Admin Actions
      </h2>

      <div className="space-y-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                profile.memberStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : profile.memberStatus === "pending"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {profile.memberStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {canApprove && (
          <button
            onClick={onApprove}
            disabled={submitting}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
            onClick={onReject}
            disabled={submitting}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
            Member status: Approved
          </p>
        )}

        {profile.memberStatus === "rejected" && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
            Member status: Rejected
          </p>
        )}
      </div>
    </motion.div>
  );
};
