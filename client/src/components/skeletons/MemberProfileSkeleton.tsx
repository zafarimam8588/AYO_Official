import { Skeleton, SkeletonAvatar } from "@/components/ui/skeleton";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { ActionPanelSkeleton } from "./ActionPanelSkeleton";
import { DashboardCardsSkeleton } from "./DashboardCardsSkeleton";

interface MemberProfileSkeletonProps {
  isAdmin?: boolean;
}

export function MemberProfileSkeleton({
  isAdmin = false,
}: MemberProfileSkeletonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30 relative">
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ff993306_1px,transparent_1px),linear-gradient(to_bottom,#13880806_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {/* Header Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                {isAdmin && <Skeleton className="h-10 w-24 rounded-lg" />}
                <SkeletonAvatar size="xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-24 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Status Banner Skeleton */}
          <Skeleton className="h-16 w-full rounded-xl" />

          {/* Dashboard Summary Cards - Only for non-admin */}
          {!isAdmin && <DashboardCardsSkeleton />}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Profile Information Skeleton */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <ProfileCardSkeleton />
            </div>

            {/* Action Panel Skeleton */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <ActionPanelSkeleton />
            </div>
          </div>

          {/* Membership Details Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
