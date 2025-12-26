import { LogOut, ImagePlus, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../ui/UserAvatar";
import { useEffect, useState, useCallback } from "react";
import { getContactMessageStats } from "@/services/contactMessageService";

interface AdminHeaderProps {
  currentUser: any;
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
    // Fetch immediately on mount
    fetchMessageStats();

    // Set up interval for subsequent updates (every 30 seconds)
    const interval = setInterval(fetchMessageStats, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
    // Empty dependency array ensures this runs only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-200 via-white to-green-200 shadow-sm border-b border-gray-200 overflow-x-hidden">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col space-y-4">
          {/* Title Section */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Manage your organization with ease
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-green-400 mx-auto sm:mx-0 mt-2 rounded-full"></div>
          </div>

          {/* User Info and Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 flex-wrap">
            {currentUser && (
              <div className="flex items-center gap-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md w-full sm:w-auto justify-center sm:justify-start">
                <UserAvatar
                  profilePic={currentUser.profilePic}
                  userName={currentUser.fullName}
                  size="md"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">
                    {currentUser.fullName}
                  </p>
                  <p className="text-xs text-gray-600">{currentUser.role}</p>
                </div>
              </div>
            )}

            <Link
              to="/admin/messages"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer w-full sm:w-auto justify-center text-sm relative"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Messages</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            <Link
              to="/admin/upload-pic"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer w-full sm:w-auto justify-center text-sm"
            >
              <ImagePlus className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Manage Pictures</span>
            </Link>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer w-full sm:w-auto justify-center text-sm"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
