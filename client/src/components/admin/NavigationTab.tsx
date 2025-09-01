import { TrendingUp, Users, UserCheck } from "lucide-react";

type ActiveView = "dashboard" | "members" | "users";

interface NavigationTabsProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  onMembersClick: () => void;
  onUsersClick: () => void;
}

export const NavigationTabs = ({
  activeView,
  onViewChange,
  onMembersClick,
  onUsersClick,
}: NavigationTabsProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
        <button
          onClick={() => onViewChange("dashboard")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer ${
            activeView === "dashboard"
              ? "bg-orange-300 text-orange-800 border-2 border-orange-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => {
            onViewChange("members");
            onMembersClick();
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer ${
            activeView === "members"
              ? "bg-green-300 text-green-800 border-2 border-green-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Members</span>
        </button>

        <button
          onClick={() => {
            onViewChange("users");
            onUsersClick();
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer ${
            activeView === "users"
              ? "bg-blue-300 text-blue-800 border-2 border-blue-400"
              : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span>Users</span>
        </button>
      </div>
    </div>
  );
};
