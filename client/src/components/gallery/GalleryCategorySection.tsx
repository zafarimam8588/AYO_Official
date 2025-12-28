import { useState, useRef, useEffect, useCallback } from "react";
import {
  Calendar,
  Users,
  GraduationCap,
  Megaphone,
  Images,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { Picture } from "@/types";
import { GalleryImageCard } from "./GalleryImageCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Users,
  GraduationCap,
  Megaphone,
  Images,
};

interface GalleryCategorySectionProps {
  id: string;
  title: string;
  iconName: string;
  images: Picture[];
  accentColor: "saffron" | "green";
  onImageClick: (globalIndex: number) => void;
  startIndex: number;
}

export function GalleryCategorySection({
  id,
  title,
  iconName,
  images,
  accentColor,
  onImageClick,
  startIndex,
}: GalleryCategorySectionProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    once: true,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const Icon = iconMap[iconName] || Images;

  // Check scroll position and update arrow visibility
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Initialize and update scroll position checks
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition, images]);

  // Scroll handlers
  const scrollBy = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const cardWidth = 280; // Approximate card width + gap
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (images.length === 0) {
    return null;
  }

  const accentStyles = {
    saffron: {
      badge: "bg-saffron-100 text-saffron-700",
      iconBg: "bg-gradient-to-br from-saffron-400 to-saffron-500",
      border: "border-saffron-200",
      bar: "bg-saffron-400",
      arrow: "bg-saffron-500 hover:bg-saffron-600 text-white",
      arrowDisabled: "bg-saffron-200 text-saffron-400 cursor-not-allowed",
    },
    green: {
      badge: "bg-india-green-100 text-india-green-700",
      iconBg: "bg-gradient-to-br from-india-green-400 to-india-green-500",
      border: "border-india-green-200",
      bar: "bg-india-green-400",
      arrow: "bg-india-green-500 hover:bg-india-green-600 text-white",
      arrowDisabled:
        "bg-india-green-200 text-india-green-400 cursor-not-allowed",
    },
  };

  const styles = accentStyles[accentColor];

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "py-12 sm:py-16 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl shadow-lg",
                styles.iconBg
              )}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>

            {/* Title and count */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {title}
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    styles.badge
                  )}
                >
                  {images.length} {images.length === 1 ? "photo" : "photos"}
                </span>
                {images.length > 4 && (
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    Scroll to see more →
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 shadow-md",
                canScrollLeft ? styles.arrow : styles.arrowDisabled
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 shadow-md",
                canScrollRight ? styles.arrow : styles.arrowDisabled
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Image Container */}
        <div className="relative">
          {/* Left fade gradient - shows when can scroll left */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden sm:block" />
          )}

          {/* Right fade gradient - shows when can scroll right */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden sm:block" />
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <div
                key={image._id}
                className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]"
              >
                <GalleryImageCard
                  image={image}
                  onClick={() => onImageClick(startIndex + index)}
                  accentColor={accentColor}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          {images.length > 1 && (
            <div className="flex justify-center gap-1 mt-4 sm:hidden">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />
                Swipe to see {images.length} photos
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
