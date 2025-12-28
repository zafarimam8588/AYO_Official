import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsAdmin } from "@/context/AdminContext";
import type { Picture } from "@/types";
import { formatImageIdentifier, getShortImageIdentifier } from "@/types";

interface AdminImageOverlayProps {
  picture: Picture;
  children: ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "full" | "short";
  className?: string;
}

/**
 * AdminImageOverlay - Wraps images and shows identifier when admin is logged in
 *
 * Usage:
 * <AdminImageOverlay picture={picture}>
 *   <img src={picture.imageUrl} alt="..." />
 * </AdminImageOverlay>
 *
 * The overlay displays:
 *   - "Home Page - Image 1"
 *   - "Gallery - Events & Activities - Image 3"
 */
export function AdminImageOverlay({
  picture,
  children,
  position = "top-left",
  variant = "short",
  className,
}: AdminImageOverlayProps) {
  const isAdmin = useIsAdmin();

  // If not admin, just render children
  if (!isAdmin) {
    return <>{children}</>;
  }

  const identifier =
    variant === "full"
      ? formatImageIdentifier(picture)
      : getShortImageIdentifier(picture);

  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div className={cn("relative group", className)}>
      {children}

      {/* Admin overlay badge */}
      <div
        className={cn(
          "absolute z-20 px-2 py-1 text-xs font-medium",
          "bg-black/70 text-white rounded-md",
          "opacity-60 group-hover:opacity-100 transition-opacity duration-200",
          "pointer-events-none select-none",
          "backdrop-blur-sm",
          "border border-white/20",
          "shadow-lg",
          positionClasses[position]
        )}
      >
        {identifier}
      </div>
    </div>
  );
}

/**
 * Standalone badge component for use without wrapping
 */
interface AdminImageBadgeProps {
  picture: Picture;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "full" | "short";
  className?: string;
}

export function AdminImageBadge({
  picture,
  position = "top-left",
  variant = "short",
  className,
}: AdminImageBadgeProps) {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return null;
  }

  const identifier =
    variant === "full"
      ? formatImageIdentifier(picture)
      : getShortImageIdentifier(picture);

  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div
      className={cn(
        "absolute z-20 px-2 py-1 text-xs font-medium",
        "bg-black/70 text-white rounded-md",
        "opacity-60 hover:opacity-100 transition-opacity duration-200",
        "pointer-events-none select-none",
        "backdrop-blur-sm",
        "border border-white/20",
        "shadow-lg",
        positionClasses[position],
        className
      )}
    >
      {identifier}
    </div>
  );
}
