import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
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
        return <CheckCircle className="w-5 h-5" />;
      case "Clock":
        return <Clock className="w-5 h-5" />;
      case "XCircle":
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  // Get status-specific styling
  const getStatusStyles = () => {
    switch (profile.memberStatus) {
      case "approved":
        return {
          bg: "bg-gradient-to-r from-india-green-500 to-india-green-600",
          iconBg: "bg-india-green-400/30",
          decoration: true,
        };
      case "pending":
        return {
          bg: "bg-gradient-to-r from-saffron-500 to-saffron-600",
          iconBg: "bg-saffron-400/30",
          decoration: false,
        };
      case "rejected":
        return {
          bg: "bg-gradient-to-r from-red-500 to-red-600",
          iconBg: "bg-red-400/30",
          decoration: false,
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-500 to-gray-600",
          iconBg: "bg-gray-400/30",
          decoration: false,
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div
      className={`relative overflow-hidden ${styles.bg} text-white p-4 sm:p-5 rounded-2xl shadow-lg
                  hover:shadow-xl transition-all duration-300 animate-on-scroll`}
    >
      {/* Decorative elements for approved status */}
      {styles.decoration && (
        <>
          <div className="absolute top-2 right-2 opacity-20">
            <Sparkles className="w-16 h-16" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </>
      )}

      <div className="relative flex items-center gap-4">
        <div className={`p-2.5 rounded-xl ${styles.iconBg} backdrop-blur-sm`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg">{config.title}</h3>
          <p className="text-white/90 text-sm mt-0.5 leading-relaxed">
            {config.msg}
          </p>
        </div>
      </div>
    </div>
  );
};
