import {
  Users,
  Image,
  Mail,
  MessageSquare,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ViewType = "dashboard" | "members" | "users" | "emails" | "pictures";

interface QuickActionsPanelProps {
  onViewChange: (view: ViewType) => void;
  onMembersClick?: () => void;
  onUsersClick?: () => void;
  onEmailsClick?: () => void;
  unreadMessages?: number;
}

interface QuickAction {
  icon: typeof Users;
  label: string;
  description: string;
  onClick: () => void;
  color: "saffron" | "green" | "blue" | "purple" | "amber";
  badge?: number;
}

const colorClasses = {
  saffron: {
    iconBg: "bg-saffron-100 group-hover:bg-saffron-200",
    iconText: "text-saffron-600",
    hoverBorder: "hover:border-saffron-300",
  },
  green: {
    iconBg: "bg-india-green-100 group-hover:bg-india-green-200",
    iconText: "text-india-green-600",
    hoverBorder: "hover:border-india-green-300",
  },
  blue: {
    iconBg: "bg-blue-100 group-hover:bg-blue-200",
    iconText: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  purple: {
    iconBg: "bg-purple-100 group-hover:bg-purple-200",
    iconText: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
  },
  amber: {
    iconBg: "bg-amber-100 group-hover:bg-amber-200",
    iconText: "text-amber-600",
    hoverBorder: "hover:border-amber-300",
  },
};

export function QuickActionsPanel({
  onViewChange,
  onMembersClick,
  onUsersClick: _onUsersClick,
  onEmailsClick,
  unreadMessages = 0,
}: QuickActionsPanelProps) {
  // _onUsersClick is available for future use if needed
  void _onUsersClick;
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      icon: Users,
      label: "View Members",
      description: "Manage all members",
      onClick: () => {
        onViewChange("members");
        onMembersClick?.();
      },
      color: "green",
    },
    {
      icon: Image,
      label: "Upload Pictures",
      description: "Add new images",
      onClick: () => navigate("/admin/upload-pic"),
      color: "purple",
    },
    {
      icon: Mail,
      label: "Email Subscribers",
      description: "Send newsletters",
      onClick: () => {
        onViewChange("emails");
        onEmailsClick?.();
      },
      color: "blue",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      description: "View contact messages",
      onClick: () => navigate("/admin/messages"),
      color: "amber",
      badge: unreadMessages,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-saffron-100 rounded-lg">
            <Zap className="w-4 h-4 text-saffron-600" />
          </div>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Quick Actions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => {
          const colors = colorClasses[action.color];
          const Icon = action.icon;

          return (
            <button
              key={index}
              onClick={action.onClick}
              className={cn(
                "w-full group flex items-center gap-3 p-3 rounded-xl",
                "border border-slate-200 bg-white",
                "transition-all duration-200",
                "hover:shadow-sm cursor-pointer",
                colors.hoverBorder
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  colors.iconBg
                )}
              >
                <Icon className={cn("w-4 h-4", colors.iconText)} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors text-sm">
                  {action.label}
                </p>
                <p className="text-xs text-slate-400">{action.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {action.badge && action.badge > 0 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                    {action.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
