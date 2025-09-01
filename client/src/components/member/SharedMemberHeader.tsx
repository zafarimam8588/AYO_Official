import { ArrowLeft, LogOut } from "lucide-react";
import type { StoredUser } from "@/types";

interface SharedMemberHeaderProps {
  isAdmin: boolean;
  currentUser: StoredUser;
  onLogout: () => void;
  onBackClick: () => void;
}

export const SharedMemberHeader = ({
  isAdmin,
  currentUser,
  onLogout,
  onBackClick,
}: SharedMemberHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-orange-400 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        {/* Back Button - Only show for Admin */}
        {isAdmin && (
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 w-fit hover:cursor-pointer hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </button>
        )}

        {/* Title Section with Gradient Text */}
        <div
          className={`flex-1 text-center ${
            isAdmin ? "sm:text-center sm:ml-6" : "sm:text-center"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent inline-block">
            {isAdmin ? "Member Details" : "Member Dashboard"}
          </h1>
          <p className="text-sm sm:text-base bg-gradient-to-r from-gray-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-relaxed font-medium">
            {isAdmin
              ? "Review member profile and application status"
              : "Manage your membership profile and track your application status"}
          </p>
        </div>

        {/* Logout Button - Only for non-admin users */}
        {!isAdmin && (
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
