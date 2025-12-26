import { Send } from "lucide-react";
import type { MemberProfile } from "@/types";

interface UserActionPanelProps {
  profile: MemberProfile;
  isProfileComplete: boolean;
  onSubmitRequest: () => void;
  submitting: boolean;
}

export const UserActionPanel = ({
  profile,
  isProfileComplete,
  onSubmitRequest,
  submitting,
}: UserActionPanelProps) => {
  const canSubmit =
    isProfileComplete &&
    profile.memberStatus !== "approved" &&
    profile.memberStatus !== "pending";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-400 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Actions</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Profile Completion
          </span>
          <span className="text-sm text-gray-800">
            {isProfileComplete ? "100%" : "60%"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isProfileComplete ? "bg-green-500" : "bg-orange-500"
            }`}
            style={{ width: isProfileComplete ? "100%" : "60%" }}
          />
        </div>
      </div>

      <button
        onClick={onSubmitRequest}
        disabled={!canSubmit || submitting}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          canSubmit && !submitting
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {submitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Submit Member Request</span>
          </>
        )}
      </button>

      {profile.memberStatus === "pending" && (
        <p className="mt-4 p-3 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg">
          Your request is under review.
        </p>
      )}
      {profile.memberStatus === "approved" && (
        <p className="mt-4 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
          You are now an approved member 🎉
        </p>
      )}
    </div>
  );
};
