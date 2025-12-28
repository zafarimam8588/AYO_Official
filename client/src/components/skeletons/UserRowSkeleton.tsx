import { Skeleton } from "@/components/ui/skeleton";

interface UserRowSkeletonProps {
  count?: number;
}

export function UserRowSkeleton({ count = 5 }: UserRowSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-xl p-4 border border-gray-200"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-56" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
