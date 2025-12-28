import { ArrowLeft, LogOut, Sparkles } from "lucide-react";
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
  // Get first name for welcome message
  const firstName = currentUser?.fullName?.split(" ")[0] || "Member";

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-white to-india-green-500" />

      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Back Button - Only show for Admin */}
          {isAdmin && (
            <button
              onClick={onBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-saffron-600
                         font-medium transition-colors duration-200 w-fit group cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-saffron-100 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-sm">Back to Dashboard</span>
            </button>
          )}

          {/* Title Section with Welcome Message */}
          <div
            className={`flex-1 ${isAdmin ? "text-center" : "text-left sm:text-center"}`}
          >
            {/* Welcome message for non-admin */}
            {!isAdmin && (
              <div className="flex items-center gap-2 justify-start sm:justify-center mb-1">
                <Sparkles className="w-4 h-4 text-saffron-500" />
                <p className="text-sm text-gray-500">
                  Welcome back,{" "}
                  <span className="font-medium text-gray-700">{firstName}</span>
                </p>
              </div>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-saffron-500 via-saffron-600 to-india-green-600 bg-clip-text text-transparent">
              {isAdmin ? "Member Details" : "Member Dashboard"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">
              {isAdmin
                ? "Review member profile and application status"
                : "Manage your profile and track your application"}
            </p>
          </div>

          {/* Logout Button - Only for non-admin users */}
          {!isAdmin && (
            <div className="flex justify-start sm:justify-end">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-600
                           hover:text-red-600 px-3.5 py-2 rounded-lg font-medium
                           transition-all duration-200 text-sm group cursor-pointer"
              >
                <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
