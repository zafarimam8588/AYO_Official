import { Skeleton } from "@/components/ui/skeleton";

interface MemberRowSkeletonProps {
  count?: number;
}

export function MemberRowSkeleton({ count = 5 }: MemberRowSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-50 rounded-xl p-4 border border-slate-200"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
