import { Skeleton } from "@/components/ui/skeleton";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

interface GalleryGridSkeletonProps {
  count?: number;
  showHeader?: boolean;
}

export function GalleryGridSkeleton({
  count = 8,
  showHeader = true,
}: GalleryGridSkeletonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30">
      <div className="relative z-10">
        {/* Header Section Skeleton */}
        {showHeader && (
          <div className="px-4 pb-8 pt-12 sm:pt-16 lg:pt-20">
            <div className="mx-auto max-w-7xl text-center">
              <Skeleton className="h-6 w-32 mx-auto mb-4 rounded-full" />
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-96 mx-auto max-w-full" />
            </div>
          </div>
        )}

        {/* Hero Carousel Skeleton */}
        <div className="mx-auto max-w-7xl px-4 mb-8">
          <Skeleton className="h-[300px] sm:h-[400px] w-full rounded-2xl" />
        </div>

        {/* Category Tabs Skeleton */}
        <div className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex gap-2 overflow-x-auto py-3 justify-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-32 rounded-full flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Section Header */}
          <div className="mb-8 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 80}ms` }}
                className="animate-fade-in-up"
              >
                <ImageCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
