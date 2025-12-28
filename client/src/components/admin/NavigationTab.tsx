import {
  TrendingUp,
  Users,
  UserCheck,
  Mail,
  Image,
  Images,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ActiveView =
  | "dashboard"
  | "members"
  | "users"
  | "emails"
  | "pictures"
  | "images"
  | "archived";

interface NavigationTabsProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  onMembersClick: () => void;
  onUsersClick: () => void;
  onEmailsClick: () => void;
  onArchivedClick: () => void;
}

interface TabConfig {
  id: ActiveView;
  label: string;
  icon: typeof TrendingUp;
  onClick: () => void;
  colors: {
    active: string;
    hover: string;
  };
}

export const NavigationTabs = ({
  activeView,
  onViewChange,
  onMembersClick,
  onUsersClick,
  onEmailsClick,
  onArchivedClick,
}: NavigationTabsProps) => {
  const tabs: TabConfig[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: TrendingUp,
      onClick: () => onViewChange("dashboard"),
      colors: {
        active:
          "bg-gradient-to-r from-saffron-100 to-saffron-200 text-saffron-800 border-saffron-300 shadow-saffron-100/50",
        hover:
          "hover:bg-saffron-50 hover:text-saffron-700 hover:border-saffron-200",
      },
    },
    {
      id: "members",
      label: "Members",
      icon: Users,
      onClick: () => {
        onViewChange("members");
        onMembersClick();
      },
      colors: {
        active:
          "bg-gradient-to-r from-india-green-100 to-india-green-200 text-india-green-800 border-india-green-300 shadow-india-green-100/50",
        hover:
          "hover:bg-india-green-50 hover:text-india-green-700 hover:border-india-green-200",
      },
    },
    {
      id: "users",
      label: "Users",
      icon: UserCheck,
      onClick: () => {
        onViewChange("users");
        onUsersClick();
      },
      colors: {
        active:
          "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 shadow-blue-100/50",
        hover: "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200",
      },
    },
    {
      id: "emails",
      label: "Emails",
      icon: Mail,
      onClick: () => {
        onViewChange("emails");
        onEmailsClick();
      },
      colors: {
        active:
          "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 shadow-purple-100/50",
        hover:
          "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200",
      },
    },
    {
      id: "pictures",
      label: "Stats",
      icon: Image,
      onClick: () => onViewChange("pictures"),
      colors: {
        active:
          "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border-pink-300 shadow-pink-100/50",
        hover: "hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200",
      },
    },
    {
      id: "images",
      label: "Images",
      icon: Images,
      onClick: () => onViewChange("images"),
      colors: {
        active:
          "bg-gradient-to-r from-orange-100 to-green-100 text-orange-800 border-orange-300 shadow-orange-100/50",
        hover:
          "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200",
      },
    },
    {
      id: "archived",
      label: "Archived",
      icon: Archive,
      onClick: () => {
        onViewChange("archived");
        onArchivedClick();
      },
      colors: {
        active:
          "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300 shadow-amber-100/50",
        hover: "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200",
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-4 overflow-x-hidden">
      {/* Tab container with glass effect */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/60 shadow-sm inline-flex flex-col sm:flex-row w-full sm:w-auto mx-auto gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;

          return (
            <button
              key={tab.id}
              onClick={tab.onClick}
              className={cn(
                "px-4 py-2.5 rounded-xl font-medium transition-all duration-200",
                "flex items-center justify-center gap-2 cursor-pointer",
                "text-sm whitespace-nowrap",
                "border border-transparent",
                isActive
                  ? cn(tab.colors.active, "shadow-sm")
                  : cn("bg-transparent text-slate-600", tab.colors.hover)
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
