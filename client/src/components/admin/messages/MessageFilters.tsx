import { Search, Inbox, Mail, Eye, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread" | "read" | "replied";

interface MessageFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filters: { id: FilterType; label: string; icon: typeof Inbox }[] = [
  { id: "all", label: "All", icon: Inbox },
  { id: "unread", label: "Unread", icon: Mail },
  { id: "read", label: "Read", icon: Eye },
  { id: "replied", label: "Replied", icon: CheckCircle },
];

export function MessageFilters({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: MessageFiltersProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 text-sm",
              "border border-slate-200 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
              "placeholder:text-slate-400",
              "transition-colors"
            )}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onFilterChange(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md",
                "text-sm font-medium whitespace-nowrap",
                "transition-all duration-150",
                filter === id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
