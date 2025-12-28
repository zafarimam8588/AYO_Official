import { LogOut, ImagePlus, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../ui/UserAvatar";
import { useEffect, useState, useCallback } from "react";
import { getContactMessageStats } from "@/services/contactMessageService";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  currentUser: {
    fullName?: string;
    profilePic?: string;
    role?: string;
  } | null;
  onLogout: () => void;
}

export const AdminHeader = ({ currentUser, onLogout }: AdminHeaderProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessageStats = useCallback(async () => {
    try {
      const response = await getContactMessageStats();
      if (response.success) {
        setUnreadCount(response.data.unread);
      }
    } catch (error) {
      console.error("Error fetching message stats:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessageStats();
    const interval = setInterval(fetchMessageStats, 30000);
    return () => clearInterval(interval);
  }, [fetchMessageStats]);

  return (
    <header className="bg-gradient-to-r from-saffron-50/80 via-white to-india-green-50/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Title Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex p-2.5 bg-gradient-to-br from-saffron-100 to-india-green-100 rounded-xl">
              <Shield className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-500">Manage your organization</p>
            </div>
          </div>

          {/* Right: User Info and Actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
            {/* User Info Pill */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-2.5 bg-white rounded-full px-3 py-1.5 shadow-sm border border-slate-100">
                <UserAvatar
                  profilePic={currentUser.profilePic}
                  userName={currentUser.fullName}
                  size="sm"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
                    {currentUser.fullName}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">
                    {currentUser.role}
                  </p>
                </div>
              </div>
            )}

            {/* Messages Button */}
            <Link
              to="/admin/messages"
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-xl",
                "bg-india-green-500 hover:bg-india-green-600",
                "text-white text-sm font-medium",
                "transition-all duration-200 shadow-sm hover:shadow-md"
              )}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* Upload Pictures Button */}
            <Link
              to="/admin/upload-pic"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl",
                "bg-gradient-to-r from-saffron-500 to-saffron-600",
                "hover:from-saffron-600 hover:to-saffron-700",
                "text-white text-sm font-medium",
                "transition-all duration-200 shadow-sm hover:shadow-md"
              )}
            >
              <ImagePlus className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl",
                "bg-slate-100 hover:bg-red-50",
                "text-slate-600 hover:text-red-600",
                "text-sm font-medium border border-slate-200 hover:border-red-200",
                "transition-all duration-200 cursor-pointer"
              )}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
