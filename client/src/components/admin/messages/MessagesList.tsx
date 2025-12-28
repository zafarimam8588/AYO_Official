import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactMessage } from "@/types";
import { MessageRow } from "./MessageRow";
import { EmptyState } from "./EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

type FilterType = "all" | "unread" | "read" | "replied";

interface MessagesListProps {
  messages: ContactMessage[];
  selectedId: string | null;
  onSelect: (message: ContactMessage) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  filter: FilterType;
  hasSearch: boolean;
  // Pagination
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function MessageSkeleton() {
  return (
    <div className="px-4 py-3 border-b border-slate-100">
      <div className="flex items-start gap-3">
        <Skeleton className="w-2 h-2 rounded-full mt-2" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-64" />
        </div>
      </div>
    </div>
  );
}

export function MessagesList({
  messages,
  selectedId,
  onSelect,
  onDelete,
  loading,
  filter,
  hasSearch,
  currentPage,
  totalPages,
  onPageChange,
}: MessagesListProps) {
  if (loading) {
    return (
      <div className="flex-1 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <MessageSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-hidden">
        <EmptyState filter={filter} hasSearch={hasSearch} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <MessageRow
            key={message._id}
            message={message}
            isSelected={selectedId === message._id}
            onClick={() => onSelect(message)}
            onDelete={(e) => {
              e.stopPropagation();
              onDelete(message._id);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm",
              "transition-colors",
              currentPage <= 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm",
              "transition-colors",
              currentPage >= totalPages
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            )}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
