import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { Picture } from "@/types";
import { getShortImageIdentifier } from "@/types";
import { cn } from "@/lib/utils";
import { getPresetUrl } from "@/utils/cloudinaryTransforms";
import { AdminImageBadge } from "@/components/common/AdminImageOverlay";

interface GalleryImageCardProps {
  image: Picture;
  onClick: () => void;
  accentColor?: "saffron" | "green";
  index?: number;
}

export function GalleryImageCard({
  image,
  onClick,
  accentColor = "saffron",
  index = 0,
}: GalleryImageCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate alt text from image identifier
  const altText = `Gallery image ${image.imageNumber}`;

  const borderColors = {
    saffron: "border-saffron-200/50 hover:border-saffron-300",
    green: "border-india-green-200/50 hover:border-india-green-300",
  };

  const accentGradient = {
    saffron: "from-saffron-500/80 to-saffron-600/80",
    green: "from-india-green-500/80 to-india-green-600/80",
  };

  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300",
        "hover:shadow-xl hover:scale-[1.02]",
        borderColors[accentColor],
        "animate-image-reveal"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${altText}`}
    >
      {/* Aspect ratio container - 4:3 */}
      <div className="aspect-[4/3] overflow-hidden">
        {/* Loading skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 to-slate-200" />
        )}

        {/* Error state */}
        {hasError && (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <div className="text-center text-slate-400">
              <ZoomIn className="mx-auto h-8 w-8" />
              <p className="mt-2 text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Image - using galleryThumb preset for optimized thumbnails */}
        {!hasError && (
          <img
            src={getPresetUrl(image.imageUrl, "galleryThumb")}
            alt={altText}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-all duration-500",
              "group-hover:scale-105",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}

        {/* Admin image badge overlay */}
        <AdminImageBadge picture={image} position="top-left" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* Zoom icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div
              className={cn(
                "rounded-full bg-gradient-to-br p-3 backdrop-blur-sm",
                accentGradient[accentColor]
              )}
            >
              <ZoomIn className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Category label for gallery images */}
          {image.category && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="line-clamp-2 text-sm font-medium text-white">
                {getShortImageIdentifier(image)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full",
          accentColor === "saffron"
            ? "bg-gradient-to-r from-saffron-400 to-saffron-500"
            : "bg-gradient-to-r from-india-green-400 to-india-green-500"
        )}
      />
    </div>
  );
}
