import { useState } from "react";
import { ImageOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPresetUrl,
  getTransformedUrl,
  type PresetName,
  type TransformOptions,
} from "@/utils/cloudinaryTransforms";

type AspectRatio = "16:9" | "4:3" | "1:1" | "3:2" | "2:3" | "21:9" | "auto";
type ObjectFit = "cover" | "contain" | "fill" | "none";
type Overlay = "none" | "gradient-bottom" | "gradient-top" | "dark" | "light";
type HoverEffect = "none" | "zoom" | "lift" | "brightness";
type Rounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

interface ImageContainerProps {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  objectPosition?: string;
  className?: string;
  containerClassName?: string;
  rounded?: Rounded;
  showSkeleton?: boolean;
  fallbackIcon?: LucideIcon;
  overlay?: Overlay;
  hoverEffect?: HoverEffect;
  priority?: boolean;
  borderColor?: "saffron" | "green" | "none";
  /** Cloudinary transform preset to apply */
  preset?: PresetName;
  /** Custom Cloudinary transform options (overrides preset) */
  transformOptions?: TransformOptions;
}

const aspectRatioMap: Record<AspectRatio, string> = {
  "16:9": "16/9",
  "4:3": "4/3",
  "1:1": "1/1",
  "3:2": "3/2",
  "2:3": "2/3",
  "21:9": "21/9",
  auto: "auto",
};

const roundedMap: Record<Rounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const overlayMap: Record<Overlay, string> = {
  none: "",
  "gradient-bottom":
    "before:absolute before:inset-0 before:bg-gradient-to-t before:from-slate-900/60 before:via-transparent before:to-transparent",
  "gradient-top":
    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-slate-900/60 before:via-transparent before:to-transparent",
  dark: "before:absolute before:inset-0 before:bg-slate-900/40",
  light: "before:absolute before:inset-0 before:bg-white/40",
};

const hoverEffectMap: Record<HoverEffect, string> = {
  none: "",
  zoom: "group-hover:scale-105",
  lift: "group-hover:-translate-y-1",
  brightness: "group-hover:brightness-110",
};

const borderColorMap: Record<"saffron" | "green" | "none", string> = {
  saffron: "border-2 border-saffron-200",
  green: "border-2 border-india-green-200",
  none: "",
};

export function ImageContainer({
  src,
  alt,
  aspectRatio = "4:3",
  objectFit = "cover",
  objectPosition = "center",
  className,
  containerClassName,
  rounded = "2xl",
  showSkeleton = true,
  fallbackIcon: FallbackIcon = ImageOff,
  overlay = "none",
  hoverEffect = "none",
  priority = false,
  borderColor = "none",
  preset,
  transformOptions,
}: ImageContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Apply Cloudinary transforms to the image URL
  const optimizedSrc = transformOptions
    ? getTransformedUrl(src, transformOptions)
    : preset
      ? getPresetUrl(src, preset)
      : src;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden group",
        roundedMap[rounded],
        overlayMap[overlay],
        borderColorMap[borderColor],
        containerClassName
      )}
      style={{
        aspectRatio: aspectRatioMap[aspectRatio],
      }}
    >
      {/* Loading skeleton */}
      {showSkeleton && isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-saffron-50 to-india-green-50">
          <div className="text-center">
            <FallbackIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full transition-all duration-500",
            hoverEffectMap[hoverEffect],
            isLoading && "opacity-0",
            !isLoading && "opacity-100",
            className
          )}
          style={{
            objectFit,
            objectPosition,
          }}
        />
      )}
    </div>
  );
}

export default ImageContainer;
