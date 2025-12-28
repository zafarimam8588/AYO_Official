import { CheckCircle, Trash2 } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { cn } from "@/lib/utils";
import type { ContactMessage } from "@/types";

interface MessageRowProps {
  message: ContactMessage;
  isSelected: boolean;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

function formatMessageDate(date: Date): string {
  const messageDate = new Date(date);
  if (isToday(messageDate)) {
    return format(messageDate, "h:mm a");
  }
  if (isYesterday(messageDate)) {
    return "Yesterday";
  }
  return format(messageDate, "MMM d");
}

export function MessageRow({
  message,
  isSelected,
  onClick,
  onDelete,
}: MessageRowProps) {
  const isUnread = message.status === "unread";
  const isReplied = message.status === "replied";

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative px-4 py-3 cursor-pointer",
        "border-b border-slate-100 last:border-b-0",
        "transition-colors duration-150",
        isSelected
          ? "bg-blue-50 border-l-2 border-l-blue-500"
          : "hover:bg-slate-50 border-l-2 border-l-transparent",
        isUnread && !isSelected && "bg-blue-50/30"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Unread indicator */}
        <div className="flex-shrink-0 pt-1.5">
          {isUnread ? (
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          ) : isReplied ? (
            <CheckCircle className="w-4 h-4 text-india-green-500" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span
              className={cn(
                "text-sm truncate",
                isUnread
                  ? "font-semibold text-slate-900"
                  : "font-medium text-slate-700"
              )}
            >
              {message.name}
            </span>
            <span className="text-xs text-slate-400 flex-shrink-0">
              {formatMessageDate(message.createdAt)}
            </span>
          </div>

          <p
            className={cn(
              "text-sm truncate mb-0.5",
              isUnread ? "text-slate-800" : "text-slate-600"
            )}
          >
            {message.subject}
          </p>

          <p className="text-xs text-slate-400 truncate">
            {message.message.slice(0, 80)}
            {message.message.length > 80 && "..."}
          </p>
        </div>

        {/* Delete button (shows on hover) */}
        {onDelete && (
          <button
            onClick={onDelete}
            className={cn(
              "flex-shrink-0 p-1.5 rounded-md",
              "text-slate-400 hover:text-red-500 hover:bg-red-50",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-150"
            )}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
