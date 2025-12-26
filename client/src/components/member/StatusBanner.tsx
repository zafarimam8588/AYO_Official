import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { getStatusConfig } from "@/utils/memberUtil";
import type { MemberProfile } from "@/types";

interface StatusBannerProps {
  profile: MemberProfile;
  isAdmin?: boolean;
}

export const StatusBanner = ({
  profile,
  isAdmin = false,
}: StatusBannerProps) => {
  const config = getStatusConfig(
    profile.memberStatus,
    isAdmin,
    profile.rejectionReason ?? undefined
  );

  const getIcon = () => {
    switch (config.icon) {
      case "CheckCircle":
        return <CheckCircle className="w-6 h-6" />;
      case "Clock":
        return <Clock className="w-6 h-6" />;
      case "XCircle":
        return <XCircle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  return (
    <div
      className={`bg-gradient-to-r ${config.bg} text-white p-4 sm:p-6 rounded-2xl shadow-lg border-l-4 ${config.borderColor} hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{config.title}</h3>
          <p className="opacity-90 text-sm sm:text-base leading-relaxed">
            {config.msg}
          </p>
        </div>
      </div>
    </div>
  );
};
