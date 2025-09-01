import { motion } from "framer-motion";
import { DetailCard } from "./DetailCard";
import { formatDate } from "@/utils/memberUtil";
import type { MemberProfile } from "@/types";

interface MembershipDetailsProps {
  profile: MemberProfile;
}

export const MembershipDetails = ({ profile }: MembershipDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-400 hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Membership Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {profile.membershipId && (
          <DetailCard
            title="Membership ID"
            value={profile.membershipId}
            color="orange"
          />
        )}
        <DetailCard
          title="Status"
          value={profile.memberStatus.replace("_", " ")}
          color={
            profile.memberStatus === "approved"
              ? "green"
              : profile.memberStatus === "pending"
              ? "orange"
              : "red"
          }
        />
        {profile.approvedBy && (
          <DetailCard
            title="Approved By"
            value={profile.approvedBy}
            color="blue"
          />
        )}
        {profile.approvedAt && (
          <DetailCard
            title="Approved On"
            value={formatDate(profile.approvedAt)}
            color="purple"
          />
        )}
      </div>

      {profile.rejectionReason && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-medium text-red-800 mb-2">Rejection Reason</h3>
          <p className="text-red-700 break-words">{profile.rejectionReason}</p>
        </div>
      )}
    </motion.div>
  );
};
