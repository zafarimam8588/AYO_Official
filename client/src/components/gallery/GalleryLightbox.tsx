import { useEffect, useCallback, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Calendar,
} from "lucide-react";
import type { Picture } from "@/types";
import { formatImageIdentifier } from "@/types";
import { cn } from "@/lib/utils";
import { getPresetUrl } from "@/utils/cloudinaryTransforms";

interface GalleryLightboxProps {
  images: Picture[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex];

  const navigatePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setZoom(1);
      setIsLoading(true);
    }
  }, [currentIndex, onNavigate]);

  const navigateNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setZoom(1);
      setIsLoading(true);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleZoomReset = () => setZoom(1);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigatePrev();
          break;
        case "ArrowRight":
          navigateNext();
          break;
        case "Escape":
          onClose();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          handleZoomReset();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, navigatePrev, navigateNext, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
    setIsLoading(true);
  }, [currentIndex]);

  if (!isOpen || !currentImage) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm animate-lightbox-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-saffron-400"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation - Previous */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigatePrev();
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:text-saffron-400 sm:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      )}

      {/* Navigation - Next */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateNext();
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:text-saffron-400 sm:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm sm:bottom-28">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/20 hover:text-saffron-400 disabled:opacity-50"
          disabled={zoom <= 0.5}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="min-w-[3rem] text-center text-sm text-white">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/20 hover:text-saffron-400 disabled:opacity-50"
          disabled={zoom >= 3}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <div className="mx-1 h-4 w-px bg-white/30" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomReset();
          }}
          className="rounded-full p-1.5 text-white transition-colors hover:bg-white/20 hover:text-saffron-400"
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Image counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm sm:left-6">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image container */}
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 py-20 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-saffron-500 border-t-transparent" />
          </div>
        )}

        {/* Image - using gallery preset for optimized display */}
        <div
          className="relative max-h-[70vh] w-full overflow-hidden rounded-2xl"
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <img
            src={getPresetUrl(currentImage.imageUrl, "gallery")}
            alt={`Gallery image ${currentImage.imageNumber}`}
            className={cn(
              "mx-auto max-h-[70vh] w-auto rounded-2xl object-contain transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            draggable={false}
          />
        </div>

        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-6">
          <p className="text-center text-lg font-medium text-white sm:text-xl">
            {formatImageIdentifier(currentImage)}
          </p>
          {currentImage.createdAt && (
            <div className="mt-2 flex items-center justify-center gap-2 text-white/70">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {formatDate(currentImage.createdAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-xs text-white/50 sm:block">
        Use arrow keys to navigate, +/- to zoom, ESC to close
      </div>
    </div>
  );
}
