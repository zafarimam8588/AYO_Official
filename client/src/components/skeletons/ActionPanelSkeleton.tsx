import { Skeleton } from "@/components/ui/skeleton";

export function ActionPanelSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Info Text */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>
    </div>
  );
}
