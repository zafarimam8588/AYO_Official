import { motion } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Users,
  Edit,
  AlertCircle,
} from "lucide-react";
import { InfoCard } from "./InfoCard";
import { formatDate, formatAddress } from "@/utils/memberUtil";
import type { StoredUser, MemberProfile } from "@/types";

interface ProfileInformationProps {
  user: StoredUser;
  profile: MemberProfile;
  isProfileComplete: boolean;
  onEditProfile: () => void;
  isAdmin?: boolean;
}

export const ProfileInformation = ({
  user,
  profile,
  isProfileComplete,
  onEditProfile,
  isAdmin = false,
}: ProfileInformationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-400 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Profile Information
        </h2>
        {/* Only show Edit button for non-admin users */}
        {!isAdmin && (
          <button
            onClick={onEditProfile}
            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 w-fit"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InfoCard
          icon={<User className="w-5 h-5" />}
          label="Full Name"
          value={user.fullName}
          completed
        />
        <InfoCard
          icon={<User className="w-5 h-5" />}
          label="Email"
          value={user.email}
          completed
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Member Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<Phone className="w-5 h-5" />}
            label="Phone Number"
            value={profile.phoneNumber ?? "Not provided"}
            completed={!!profile.phoneNumber}
          />
          <InfoCard
            icon={<Calendar className="w-5 h-5" />}
            label="Date of Birth"
            value={
              profile.dateOfBirth
                ? formatDate(profile.dateOfBirth)
                : "Not provided"
            }
            completed={!!profile.dateOfBirth}
          />
          <InfoCard
            icon={<Users className="w-5 h-5" />}
            label="Gender"
            value={profile.gender ?? "Not provided"}
            completed={!!profile.gender}
          />
          <InfoCard
            icon={<MapPin className="w-5 h-5" />}
            label="Address"
            value={formatAddress(profile.address)}
            completed={!!profile.address}
          />
        </div>

        {profile.whyJoin && (
          <div className="mt-6">
            <InfoCard
              icon={<AlertCircle className="w-5 h-5" />}
              label="Why do you want to join?"
              value={profile.whyJoin}
              completed
              fullWidth
            />
          </div>
        )}
      </div>

      {!isProfileComplete && !isAdmin && (
        <p className="mt-4 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-3">
          Complete all fields to enable "Submit Member Request".
        </p>
      )}
    </motion.div>
  );
};
