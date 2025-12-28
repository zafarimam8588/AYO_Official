import React from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  UserCheck,
  Calendar,
  IdCard,
} from "lucide-react";
import type { MemberProfile, StoredUser } from "@/types";
import { ProgressRing } from "./ProgressRing";

interface DashboardSummaryCardsProps {
  profile: MemberProfile;
  user: StoredUser;
  profileCompletionPercentage: number;
}

const getStatusInfo = (status: MemberProfile["memberStatus"]) => {
  switch (status) {
    case "approved":
      return {
        icon: CheckCircle,
        label: "Approved",
        color: "text-india-green-600",
        bgColor: "bg-india-green-50",
        borderColor: "border-india-green-200",
      };
    case "pending":
      return {
        icon: Clock,
        label: "Pending",
        color: "text-saffron-600",
        bgColor: "bg-saffron-50",
        borderColor: "border-saffron-200",
      };
    case "rejected":
      return {
        icon: XCircle,
        label: "Rejected",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    default:
      return {
        icon: AlertCircle,
        label: "Not Submitted",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      };
  }
};

export const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({
  profile,
  user,
  profileCompletionPercentage,
}) => {
  const statusInfo = getStatusInfo(profile.memberStatus);
  const StatusIcon = statusInfo.icon;

  // Format the member since date
  const memberSince = user.isProfileComplete
    ? new Date().toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "—";

  const cards = [
    {
      id: "status",
      label: "Application Status",
      content: (
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full ${statusInfo.bgColor}`}>
            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
          </div>
          <span className={`font-semibold ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>
      ),
      icon: UserCheck,
      borderColor: statusInfo.borderColor,
    },
    {
      id: "progress",
      label: "Profile Progress",
      content: (
        <ProgressRing
          percentage={profileCompletionPercentage}
          size={56}
          strokeWidth={5}
        />
      ),
      icon: null,
      borderColor:
        profileCompletionPercentage === 100
          ? "border-india-green-200"
          : "border-saffron-200",
    },
    {
      id: "memberSince",
      label: "Member Since",
      content: (
        <span className="text-lg font-semibold text-gray-800">
          {memberSince}
        </span>
      ),
      icon: Calendar,
      borderColor: "border-warm-200",
    },
    {
      id: "memberId",
      label: "Member ID",
      content: (
        <span className="text-sm font-mono font-semibold text-gray-800">
          {profile.membershipId || "—"}
        </span>
      ),
      icon: IdCard,
      borderColor: profile.membershipId
        ? "border-india-green-200"
        : "border-gray-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`
            bg-white rounded-xl p-4 shadow-sm border ${card.borderColor}
            hover:shadow-md transition-all duration-300
            animate-on-scroll
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {card.label}
            </p>
            <div className="min-h-[56px] flex items-center justify-center">
              {card.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
