import { cn } from "@/lib/utils";

/**
 * Base Skeleton component with shimmer animation
 * Uses warm colors matching the app's theme for a cohesive loading state
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md bg-gradient-to-r from-warm-200 via-warm-100 to-warm-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]",
        className
      )}
      {...props}
    />
  );
}

/**
 * Text skeleton for paragraph lines with varying widths
 */
function SkeletonText({
  lines = 3,
  className,
  ...props
}: React.ComponentProps<"div"> & { lines?: number }) {
  const widths = ["100%", "90%", "75%", "85%", "60%"];
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  );
}

/**
 * Circular skeleton for avatars and profile images
 */
function SkeletonAvatar({
  size = "md",
  className,
  ...props
}: React.ComponentProps<"div"> & { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };
  return (
    <Skeleton
      className={cn("rounded-full", sizeClasses[size], className)}
      {...props}
    />
  );
}

/**
 * Card-shaped skeleton with optional header section
 */
function SkeletonCard({
  hasHeader = true,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { hasHeader?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div className="mb-4 flex items-center gap-3">
          <SkeletonAvatar size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      )}
      {children || <SkeletonText lines={3} />}
    </div>
  );
}

/**
 * Button-shaped skeleton
 */
function SkeletonButton({
  size = "md",
  className,
  ...props
}: React.ComponentProps<"div"> & { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-20",
    md: "h-10 w-24",
    lg: "h-12 w-32",
  };
  return (
    <Skeleton
      className={cn("rounded-lg", sizeClasses[size], className)}
      {...props}
    />
  );
}

/**
 * Badge-shaped skeleton for status indicators
 */
function SkeletonBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton className={cn("h-5 w-16 rounded-full", className)} {...props} />
  );
}

/**
 * Image placeholder skeleton
 */
function SkeletonImage({
  aspectRatio = "video",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  aspectRatio?: "square" | "video" | "wide";
}) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
  };
  return (
    <Skeleton
      className={cn("w-full rounded-lg", aspectClasses[aspectRatio], className)}
      {...props}
    />
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonButton,
  SkeletonBadge,
  SkeletonImage,
};
