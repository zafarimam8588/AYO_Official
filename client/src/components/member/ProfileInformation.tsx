import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Edit,
  AlertCircle,
  Heart,
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-saffron-50 via-white to-india-green-50 px-5 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Profile Information
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Your personal and contact details
            </p>
          </div>
          {!isAdmin && (
            <button
              onClick={onEditProfile}
              className="flex items-center gap-2 bg-white text-saffron-600 px-4 py-2 rounded-lg
                         border border-saffron-200 hover:bg-saffron-50 hover:border-saffron-300
                         transition-all duration-200 w-fit shadow-sm cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span className="font-medium">Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Account Information Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<User className="w-4 h-4" />}
              label="Full Name"
              value={user.fullName}
              completed
            />
            <InfoCard
              icon={<Mail className="w-4 h-4" />}
              label="Email Address"
              value={user.email}
              completed
            />
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<Phone className="w-4 h-4" />}
              label="Phone Number"
              value={profile.phoneNumber ?? "Not provided"}
              completed={!!profile.phoneNumber}
            />
            <InfoCard
              icon={<Calendar className="w-4 h-4" />}
              label="Date of Birth"
              value={
                profile.dateOfBirth
                  ? formatDate(profile.dateOfBirth)
                  : "Not provided"
              }
              completed={!!profile.dateOfBirth}
            />
            <InfoCard
              icon={<Users className="w-4 h-4" />}
              label="Gender"
              value={profile.gender ?? "Not provided"}
              completed={!!profile.gender}
            />
            <InfoCard
              icon={<MapPin className="w-4 h-4" />}
              label="Address"
              value={formatAddress(profile.address)}
              completed={!!profile.address}
            />
          </div>
        </div>

        {/* Motivation Section */}
        {profile.whyJoin && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Motivation
            </h3>
            <InfoCard
              icon={<Heart className="w-4 h-4" />}
              label="Why do you want to join AYO?"
              value={profile.whyJoin}
              completed
              fullWidth
            />
          </div>
        )}

        {/* Incomplete Profile Warning */}
        {!isProfileComplete && !isAdmin && (
          <div className="mt-6 p-4 flex items-start gap-3 bg-saffron-50 border border-saffron-200 rounded-xl">
            <div className="p-1.5 bg-saffron-100 rounded-full mt-0.5">
              <AlertCircle className="w-4 h-4 text-saffron-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-saffron-700">
                Incomplete Profile
              </p>
              <p className="text-xs text-saffron-600 mt-0.5">
                Complete all fields to enable membership submission
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
