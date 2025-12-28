import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
} from "@/components/ui/skeleton";

export function MessageDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Skeleton className="h-10 w-24 rounded-lg mb-6" />

        {/* Message Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <SkeletonAvatar size="lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Subject */}
          <div className="px-6 py-4 border-b border-slate-100">
            <Skeleton className="h-7 w-3/4" />
          </div>

          {/* Message Body */}
          <div className="p-6">
            <SkeletonText lines={5} />
          </div>

          {/* Reply Section */}
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-32 w-full rounded-lg mb-4" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
