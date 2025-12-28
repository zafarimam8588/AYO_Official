import { AlertTriangle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PageName, GalleryCategory } from "@/types";
import { PAGE_OPTIONS, GALLERY_CATEGORIES } from "@/types";

interface ExistingImageInfo {
  id: string;
  imageUrl: string;
  page: PageName;
  imageNumber: number;
  category?: GalleryCategory;
}

interface ReplaceConfirmModalProps {
  isOpen: boolean;
  existingImage: ExistingImageInfo;
  newPreviewUrl: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ReplaceConfirmModal({
  isOpen,
  existingImage,
  newPreviewUrl,
  onConfirm,
  onCancel,
  isLoading = false,
}: ReplaceConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  // Build identifier
  const pageLabel =
    PAGE_OPTIONS.find((p) => p.value === existingImage.page)?.label ||
    existingImage.page;
  const categoryLabel =
    existingImage.category &&
    GALLERY_CATEGORIES.find((c) => c.value === existingImage.category)?.label;

  const identifier = categoryLabel
    ? `${pageLabel} - ${categoryLabel} - Image ${existingImage.imageNumber}`
    : `${pageLabel} - Image ${existingImage.imageNumber}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Replace Existing Image?
              </h3>
              <p className="text-sm text-gray-500">{identifier}</p>
            </div>
          </div>

          {/* Image comparison */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Current Image */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">
                Current Image
              </p>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100">
                <img
                  src={existingImage.imageUrl}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xs text-white/90 font-medium">
                  Will be deleted
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex">
              <div className="p-2 bg-white rounded-full shadow-lg border">
                <ArrowRight className="h-4 w-4 text-saffron-600" />
              </div>
            </div>

            {/* New Image */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">
                New Image
              </p>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-saffron-200 bg-slate-100">
                <img
                  src={newPreviewUrl}
                  alt="New"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xs text-white/90 font-medium">
                  Will replace
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <p className="text-sm text-amber-800">
              <strong>Warning:</strong> This will permanently replace the
              current image. The old image will be deleted from the server and
              cannot be recovered.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className={cn(
                "flex-1 text-white",
                "bg-saffron-500 hover:bg-saffron-600",
                "disabled:bg-saffron-300"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Replacing...
                </span>
              ) : (
                "Replace Image"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
