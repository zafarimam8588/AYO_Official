import { TrendingUp, Users, UserCheck, Mail, Image } from "lucide-react";

type ActiveView = "dashboard" | "members" | "users" | "emails" | "pictures";

interface NavigationTabsProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  onMembersClick: () => void;
  onUsersClick: () => void;
  onEmailsClick: () => void;
}

export const NavigationTabs = ({
  activeView,
  onViewChange,
  onMembersClick,
  onUsersClick,
  onEmailsClick,
}: NavigationTabsProps) => {
  return (
    <div className="container mx-auto px-4 py-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-8 w-full">
        <button
          onClick={() => onViewChange("dashboard")}
          className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
            activeView === "dashboard"
              ? "bg-orange-300 text-orange-800 border-2 border-orange-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
          }`}
        >
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Dashboard</span>
        </button>

        <button
          onClick={() => {
            onViewChange("members");
            onMembersClick();
          }}
          className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
            activeView === "members"
              ? "bg-green-300 text-green-800 border-2 border-green-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
          }`}
        >
          <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Members</span>
        </button>

        <button
          onClick={() => {
            onViewChange("users");
            onUsersClick();
          }}
          className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
            activeView === "users"
              ? "bg-blue-300 text-blue-800 border-2 border-blue-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          }`}
        >
          <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Users</span>
        </button>

        <button
          onClick={() => {
            onViewChange("emails");
            onEmailsClick();
          }}
          className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
            activeView === "emails"
              ? "bg-purple-300 text-purple-800 border-2 border-purple-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
          }`}
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="whitespace-nowrap text-xs sm:text-sm">
            Subscribed Emails
          </span>
        </button>

        <button
          onClick={() => onViewChange("pictures")}
          className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
            activeView === "pictures"
              ? "bg-pink-300 text-pink-800 border-2 border-pink-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300"
          }`}
        >
          <Image className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">Pictures</span>
        </button>
      </div>
    </div>
  );
};
