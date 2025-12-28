import { Send, CheckCircle, Clock } from "lucide-react";
import type { MemberProfile } from "@/types";
import { ProgressRing } from "./ProgressRing";
import { QuickLinksPanel } from "./QuickLinksPanel";
import { RotatingBorderButton } from "./RotatingBorderButton";

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

  const completionPercentage = isProfileComplete ? 100 : 60;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-5">Actions</h2>

      {/* Profile Completion Section */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-warm-50 rounded-xl">
        <ProgressRing
          percentage={completionPercentage}
          size={64}
          strokeWidth={5}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">
            Profile Completion
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {isProfileComplete
              ? "Your profile is complete"
              : "Complete your profile to submit"}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      {canSubmit ? (
        <RotatingBorderButton
          onClick={onSubmitRequest}
          disabled={submitting}
          variant="primary"
          className="w-full"
        >
          {submitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Member Request</span>
            </>
          )}
        </RotatingBorderButton>
      ) : (
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span>Submit Member Request</span>
        </button>
      )}

      {/* Status Messages */}
      {profile.memberStatus === "pending" && (
        <div className="mt-4 p-3.5 flex items-start gap-3 bg-saffron-50 border border-saffron-200 rounded-xl">
          <div className="p-1 bg-saffron-100 rounded-full mt-0.5">
            <Clock className="w-3.5 h-3.5 text-saffron-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-saffron-700">Under Review</p>
            <p className="text-xs text-saffron-600 mt-0.5">
              Your application is being processed
            </p>
          </div>
        </div>
      )}

      {profile.memberStatus === "approved" && (
        <div className="mt-4 p-3.5 flex items-start gap-3 bg-india-green-50 border border-india-green-200 rounded-xl">
          <div className="p-1 bg-india-green-100 rounded-full mt-0.5">
            <CheckCircle className="w-3.5 h-3.5 text-india-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-india-green-700">
              Approved Member
            </p>
            <p className="text-xs text-india-green-600 mt-0.5">
              Welcome to the AYO family!
            </p>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <QuickLinksPanel />
    </div>
  );
};
