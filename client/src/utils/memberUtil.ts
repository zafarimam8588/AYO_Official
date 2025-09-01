import type { MemberProfile } from "@/types";

export const checkProfileCompletion = (profile: MemberProfile): boolean => {
  return !!(
    profile.address &&
    profile.phoneNumber &&
    profile.dateOfBirth &&
    profile.gender &&
    profile.whyJoin
  );
};

export const getStatusConfig = (
  status: string,
  isAdmin: boolean = false,
  rejectionReason?: string
) => {
  const configs = {
    approved: {
      bg: "from-green-500 to-green-600",
      icon: "CheckCircle",
      title: isAdmin ? "Member Status: Approved" : "Membership Approved",
      msg: isAdmin
        ? "This member has been approved for membership."
        : "Congratulations! You are now an approved member.",
      borderColor: "border-green-400",
    },
    pending: {
      bg: "from-orange-500 to-orange-600",
      icon: "Clock",
      title: isAdmin ? "Member Status: Pending" : "Application Under Review",
      msg: isAdmin
        ? "This member's application is pending review."
        : "Your membership request is being reviewed.",
      borderColor: "border-orange-400",
    },
    rejected: {
      bg: "from-red-500 to-red-600",
      icon: "XCircle",
      title: isAdmin ? "Member Status: Rejected" : "Application Rejected",
      msg: isAdmin
        ? `Application rejected. ${
            rejectionReason ? `Reason: ${rejectionReason}` : ""
          }`
        : rejectionReason || "Your application was not approved.",
      borderColor: "border-red-400",
    },
    not_submitted: {
      bg: "from-gray-500 to-gray-600",
      icon: "AlertCircle",
      title: isAdmin ? "Member Status: Not Submitted" : "Profile Incomplete",
      msg: isAdmin
        ? "This member has not submitted their application yet."
        : "Complete your profile to submit a request.",
      borderColor: "border-gray-400",
    },
  };

  return configs[status as keyof typeof configs] || configs.not_submitted;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const formatAddress = (address: any): string => {
  if (!address) return "Not provided";
  return `${address.street}, ${address.city}, ${address.state} – ${address.pincode}`;
};
