import { useState, useEffect, useCallback } from "react";
import {
  Grid3X3,
  List,
  Trash2,
  Image as ImageIcon,
  X,
  ChevronDown,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPictures, deletePicture } from "@/services/pictureService";
import { getPresetUrl } from "@/utils/cloudinaryTransforms";
import type { Picture, PageName, GalleryCategory } from "@/types";
import {
  PAGE_OPTIONS,
  GALLERY_CATEGORIES,
  formatImageIdentifier,
  getShortImageIdentifier,
} from "@/types";
import toast from "react-hot-toast";
import { useIsViewer } from "@/context/AdminContext";
import { showToast } from "@/lib/toast";

interface Filters {
  page: PageName | "all";
  category: GalleryCategory | "all";
}

interface ImageManagerProps {
  onDelete?: (picture: Picture) => void;
  refreshTrigger?: boolean;
}

export function ImageManager({ onDelete, refreshTrigger }: ImageManagerProps) {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [filters, setFilters] = useState<Filters>({
    page: "all",
    category: "all",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [previewPicture, setPreviewPicture] = useState<Picture | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState<Picture | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const isViewer = useIsViewer();

  // Fetch pictures
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllPictures({ limit: 200 });
      setPictures(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  // Filter pictures
  const filteredPictures = pictures.filter((pic) => {
    if (filters.page !== "all" && pic.page !== filters.page) {
      return false;
    }
    if (
      filters.category !== "all" &&
      filters.page === "gallery" &&
      pic.category !== filters.category
    ) {
      return false;
    }
    return true;
  });

  // Sort by page then by imageNumber
  const sortedPictures = [...filteredPictures].sort((a, b) => {
    if (a.page !== b.page) {
      return a.page.localeCompare(b.page);
    }
    if (a.category !== b.category) {
      return (a.category || "").localeCompare(b.category || "");
    }
    return a.imageNumber - b.imageNumber;
  });

  // Delete handlers
  const handleDeleteClick = (picture: Picture) => {
    if (isViewer) {
      showToast.info("You have view-only access");
      return;
    }
    if (onDelete) {
      onDelete(picture);
    } else {
      setPictureToDelete(picture);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!pictureToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await deletePicture(pictureToDelete._id);
      toast.success("Image deleted successfully");
      setDeleteModalOpen(false);
      setPictureToDelete(null);
      fetchData();
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPictureToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-india-green-50 via-green-50 to-india-green-50 rounded-2xl border border-india-green-100">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-india-green-600 to-green-600 bg-clip-text text-transparent">
            Image Manager
          </h2>
          <p className="text-slate-500 mt-1">{sortedPictures.length} images</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="rounded-xl hover:border-india-green-300"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`rounded-xl transition-all ${viewMode === "grid" ? "bg-india-green-500 text-white border-india-green-500 hover:bg-india-green-600" : "hover:border-india-green-300"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("list")}
            className={`rounded-xl transition-all ${viewMode === "list" ? "bg-india-green-500 text-white border-india-green-500 hover:bg-india-green-600" : "hover:border-india-green-300"}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-br from-white via-green-50/30 to-india-green-50/30 rounded-2xl shadow-sm border border-india-green-100">
        {/* Page Filter */}
        <div className="relative">
          <select
            value={filters.page}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                page: e.target.value as PageName | "all",
                category: "all",
              }))
            }
            className="px-4 py-2 pr-10 border border-india-green-200 rounded-xl bg-white text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:border-india-green-300 focus:outline-none focus:ring-2 focus:ring-india-green-200"
          >
            <option value="all">All Pages</option>
            {PAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Category Filter (only when gallery is selected) */}
        {filters.page === "gallery" && (
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  category: e.target.value as GalleryCategory | "all",
                }))
              }
              className="px-4 py-2 pr-10 border border-india-green-200 rounded-xl bg-white text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:border-india-green-300 focus:outline-none focus:ring-2 focus:ring-india-green-200"
            >
              <option value="all">All Categories</option>
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-india-green-200 border-t-india-green-500" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && sortedPictures.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <ImageIcon className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">No images found</p>
          <p className="text-sm text-slate-500 mt-1">
            {filters.page !== "all"
              ? "Try selecting a different page"
              : "Upload some images to get started"}
          </p>
        </div>
      )}

      {/* Grid View */}
      {!isLoading && viewMode === "grid" && sortedPictures.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedPictures.map((picture) => (
            <div
              key={picture._id}
              className="relative group rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-india-green-300 hover:shadow-md transition-all duration-200 bg-white"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={getPresetUrl(picture.imageUrl, "galleryThumb")}
                  alt={`Image ${picture.imageNumber}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Image Identifier Badge */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-md backdrop-blur-sm">
                {getShortImageIdentifier(picture)}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewPicture(picture)}
                  className="rounded-xl"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDeleteClick(picture)}
                  className="rounded-xl text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!isLoading && viewMode === "list" && sortedPictures.length > 0 && (
        <div className="space-y-2">
          {sortedPictures.map((picture) => (
            <div
              key={picture._id}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-india-green-300 transition-all bg-white"
            >
              {/* Thumbnail */}
              <img
                src={getPresetUrl(picture.imageUrl, "thumbnail")}
                alt={`Image ${picture.imageNumber}`}
                className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800">
                  {formatImageIdentifier(picture)}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Uploaded {new Date(picture.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setPreviewPicture(picture)}
                  className="rounded-xl"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteClick(picture)}
                  className="rounded-xl text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewPicture && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            onClick={() => setPreviewPicture(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-bold text-lg text-slate-800">
                  {formatImageIdentifier(previewPicture)}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewPicture(null)}
                  className="rounded-xl"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                <img
                  src={getPresetUrl(previewPicture.imageUrl, "gallery")}
                  alt={`Image ${previewPicture.imageNumber}`}
                  className="w-full rounded-xl mb-4"
                />
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Page</p>
                      <p className="text-slate-800">
                        {PAGE_OPTIONS.find(
                          (p) => p.value === previewPicture.page
                        )?.label || previewPicture.page}
                      </p>
                    </div>
                    {previewPicture.category && (
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Category
                        </p>
                        <p className="text-slate-800">
                          {GALLERY_CATEGORIES.find(
                            (c) => c.value === previewPicture.category
                          )?.label || previewPicture.category}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Image Number
                      </p>
                      <p className="text-slate-800">
                        {previewPicture.imageNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Uploaded
                      </p>
                      <p className="text-slate-800">
                        {new Date(
                          previewPicture.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && pictureToDelete && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={cancelDelete}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Delete Image
                  </h3>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex gap-3">
                  <img
                    src={getPresetUrl(pictureToDelete.imageUrl, "thumbnail")}
                    alt={`Image ${pictureToDelete.imageNumber}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {formatImageIdentifier(pictureToDelete)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={cancelDelete}
                  variant="outline"
                  className="flex-1 rounded-xl"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageManager;
