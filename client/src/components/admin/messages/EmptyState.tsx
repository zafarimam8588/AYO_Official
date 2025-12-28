import { Inbox, Mail, CheckCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread" | "read" | "replied";

interface EmptyStateProps {
  filter: FilterType;
  hasSearch?: boolean;
}

const emptyMessages: Record<
  FilterType,
  { icon: typeof Inbox; title: string; description: string }
> = {
  all: {
    icon: Inbox,
    title: "No messages yet",
    description: "When visitors contact you, their messages will appear here.",
  },
  unread: {
    icon: Mail,
    title: "No unread messages",
    description: "You're all caught up! No new messages to review.",
  },
  read: {
    icon: Eye,
    title: "No read messages",
    description: "Messages you've viewed will appear here.",
  },
  replied: {
    icon: CheckCircle,
    title: "No replied messages",
    description: "Messages you've responded to will appear here.",
  },
};

export function EmptyState({ filter, hasSearch = false }: EmptyStateProps) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <Inbox className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-1">
          No results found
        </h3>
        <p className="text-sm text-slate-500 text-center max-w-sm">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  const { icon: Icon, title, description } = emptyMessages[filter];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div
        className={cn(
          "p-4 rounded-full mb-4",
          filter === "unread"
            ? "bg-blue-100"
            : filter === "replied"
              ? "bg-india-green-100"
              : "bg-slate-100"
        )}
      >
        <Icon
          className={cn(
            "w-8 h-8",
            filter === "unread"
              ? "text-blue-500"
              : filter === "replied"
                ? "text-india-green-500"
                : "text-slate-400"
          )}
        />
      </div>
      <h3 className="text-lg font-medium text-slate-700 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
}
