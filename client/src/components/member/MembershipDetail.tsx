import { AlertTriangle } from "lucide-react";
import { DetailCard } from "./DetailCard";
import { formatDate } from "@/utils/memberUtil";
import type { MemberProfile } from "@/types";

interface MembershipDetailsProps {
  profile: MemberProfile;
}

export const MembershipDetails = ({ profile }: MembershipDetailsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll">
      {/* Header */}
      <div className="bg-gradient-to-r from-saffron-50 via-white to-india-green-50 px-5 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Membership Details
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Your membership application information
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {profile.membershipId && (
            <DetailCard
              title="Membership ID"
              value={profile.membershipId}
              color="saffron"
              icon="id"
            />
          )}
          <DetailCard
            title="Status"
            value={profile.memberStatus.replace("_", " ")}
            color={
              profile.memberStatus === "approved"
                ? "green"
                : profile.memberStatus === "pending"
                  ? "saffron"
                  : "red"
            }
            icon="status"
          />
          {profile.approvedBy && (
            <DetailCard
              title="Approved By"
              value={profile.approvedBy}
              color="green"
              icon="user"
            />
          )}
          {profile.approvedAt && (
            <DetailCard
              title="Approved On"
              value={formatDate(profile.approvedAt)}
              color="blue"
              icon="calendar"
            />
          )}
        </div>

        {/* Rejection Reason */}
        {profile.rejectionReason && (
          <div className="mt-5 p-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl">
            <div className="p-1.5 bg-red-100 rounded-full mt-0.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-700">
                Rejection Reason
              </p>
              <p className="text-sm text-red-600 mt-1 break-words">
                {profile.rejectionReason}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
