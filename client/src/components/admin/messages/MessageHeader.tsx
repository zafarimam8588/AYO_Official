import { ArrowLeft, Mail, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MessageHeaderProps {
  unreadCount?: number;
  totalCount?: number;
}

export function MessageHeader({
  unreadCount = 0,
  totalCount = 0,
}: MessageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-[57px] sm:top-[65px] z-30">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back button and title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "text-slate-600 hover:text-slate-900",
                "hover:bg-slate-100 transition-colors",
                "text-sm font-medium"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Inbox className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Messages
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {totalCount} total messages
                </p>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge
                variant="default"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Mail className="w-3 h-3 mr-1" />
                {unreadCount} unread
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
