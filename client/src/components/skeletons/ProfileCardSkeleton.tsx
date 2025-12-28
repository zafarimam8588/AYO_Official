import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Profile Fields */}
      <div className="space-y-4">
        {/* Personal Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full max-w-[200px]" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-4" />

        {/* Address Section */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  );
}
