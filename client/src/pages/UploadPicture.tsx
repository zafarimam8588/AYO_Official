import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  AlertCircle,
  CheckCircle,
  X,
  ChevronRight,
  Images,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageManager } from "@/components/admin/ImageManager";
import { ReplaceConfirmModal } from "@/components/admin/ReplaceConfirmModal";
import {
  uploadPicture,
  getAllPictures,
  deletePicture,
  getImageBySlot,
  getNextImageNumber,
  replacePictureImage,
} from "@/services/pictureService";
import type { Picture, PageName, GalleryCategory } from "@/types";
import {
  PAGE_OPTIONS,
  GALLERY_CATEGORIES,
  getMaxImageNumber,
  pageAcceptsImages,
} from "@/types";
import { cn } from "@/lib/utils";

type UploadStep = 1 | 2 | 3 | 4;

interface ExistingSlot {
  id: string;
  imageUrl: string;
  page: PageName;
  imageNumber: number;
  category?: GalleryCategory;
}

export default function UploadPicture() {
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState("upload");

  // Step-by-step upload state
  const [step, setStep] = useState<UploadStep>(1);
  const [selectedPage, setSelectedPage] = useState<PageName | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory | null>(null);
  const [imageNumber, setImageNumber] = useState<number>(1);
  const [autoAssign, setAutoAssign] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Existing slot state
  const [existingSlot, setExistingSlot] = useState<ExistingSlot | null>(null);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [isCheckingSlot, setIsCheckingSlot] = useState(false);

  // Upload state
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Gallery state
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState<Picture | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);

  // Fetch pictures
  const fetchPictures = async () => {
    try {
      setIsFetching(true);
      const response = await getAllPictures({ limit: 100 });
      setPictures(response.data);
    } catch (error) {
      console.error("Error fetching pictures:", error);
      toast.error("Failed to load pictures");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  // Calculate stats
  const stats = {
    total: pictures.length,
    gallery: pictures.filter((p) => p.page === "gallery").length,
    home: pictures.filter((p) => p.page === "home").length,
  };

  // Auto-fetch next image number when page/category changes
  useEffect(() => {
    const fetchNextNumber = async () => {
      if (!selectedPage || !autoAssign) {
        return;
      }

      try {
        const response = await getNextImageNumber(
          selectedPage,
          selectedPage === "gallery" ? selectedCategory || undefined : undefined
        );

        let nextNumber = response.data.nextImageNumber;

        // Cap at max limit for non-unlimited pages
        const maxLimit = getMaxImageNumber(selectedPage);
        if (maxLimit !== null && nextNumber > maxLimit) {
          // All slots are filled, use the max (will show replace warning)
          nextNumber = maxLimit;
        }

        setImageNumber(nextNumber);
        setExistingSlot(null);
      } catch (error) {
        console.error("Error fetching next number:", error);
      }
    };

    fetchNextNumber();
  }, [selectedPage, selectedCategory, autoAssign]);

  // Check if slot exists when manually entering image number
  const checkSlotExists = useCallback(async () => {
    if (!selectedPage || !imageNumber || autoAssign) {
      return;
    }

    setIsCheckingSlot(true);
    try {
      const response = await getImageBySlot(
        selectedPage,
        imageNumber,
        selectedPage === "gallery" ? selectedCategory || undefined : undefined
      );

      if (response.exists && response.data) {
        setExistingSlot({
          id: response.data._id,
          imageUrl: response.data.imageUrl,
          page: response.data.page,
          imageNumber: response.data.imageNumber,
          category: response.data.category,
        });
      } else {
        setExistingSlot(null);
      }
    } catch (error) {
      console.error("Error checking slot:", error);
      setExistingSlot(null);
    } finally {
      setIsCheckingSlot(false);
    }
  }, [selectedPage, imageNumber, selectedCategory, autoAssign]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoAssign && imageNumber) {
        checkSlotExists();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [imageNumber, autoAssign, checkSlotExists]);

  // Handle file selection
  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  // Handle upload
  const handleUpload = async () => {
    if (!selectedPage || !imageNumber || !selectedFile) {
      toast.error("Please complete all steps");
      return;
    }

    // If slot exists, show replace modal
    if (existingSlot) {
      setShowReplaceModal(true);
      return;
    }

    // Normal upload
    await performUpload();
  };

  const performUpload = async () => {
    if (!selectedPage || !imageNumber || !selectedFile) {
      return;
    }

    try {
      setIsLoading(true);
      setUploadProgress(0);

      await uploadPicture(
        {
          page: selectedPage,
          imageNumber,
          category:
            selectedPage === "gallery"
              ? selectedCategory || "general"
              : undefined,
          image: selectedFile,
        },
        (progress) => setUploadProgress(progress.percentCompleted)
      );

      toast.success("Picture uploaded successfully!");
      resetForm();
      fetchPictures();
    } catch (error: any) {
      console.error("Error uploading:", error);
      toast.error(error.response?.data?.message || "Failed to upload picture");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleReplaceConfirm = async () => {
    if (!existingSlot || !selectedFile) {
      return;
    }

    try {
      setIsLoading(true);
      setUploadProgress(0);

      await replacePictureImage(existingSlot.id, selectedFile, (progress) =>
        setUploadProgress(progress.percentCompleted)
      );

      toast.success("Image replaced successfully!");
      setShowReplaceModal(false);
      resetForm();
      fetchPictures();
    } catch (error: any) {
      console.error("Error replacing:", error);
      toast.error(error.response?.data?.message || "Failed to replace image");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  // Reset form
  const resetForm = () => {
    setStep(1);
    setSelectedPage(null);
    setSelectedCategory(null);
    setImageNumber(1);
    setAutoAssign(true);
    setSelectedFile(null);
    setPreviewUrl("");
    setExistingSlot(null);
  };

  // Delete handlers
  const handleDeleteClick = (picture: Picture) => {
    setPictureToDelete(picture);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!pictureToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await deletePicture(pictureToDelete._id);
      toast.success("Picture deleted successfully");
      fetchPictures();
      setDeleteModalOpen(false);
      setPictureToDelete(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete picture");
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigate steps
  const goToNextStep = () => {
    if (step === 1 && selectedPage) {
      if (selectedPage === "gallery") {
        setStep(2);
      } else {
        setStep(3);
      }
    } else if (step === 2 && selectedCategory) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const goToPrevStep = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(selectedPage === "gallery" ? 2 : 1);
    } else if (step === 4) {
      setStep(3);
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return !!selectedPage;
    }
    if (step === 2) {
      return !!selectedCategory;
    }
    if (step === 3) {
      if (imageNumber < 1) {
        return false;
      }
      // Check max limit for non-gallery/unlimited pages
      if (selectedPage) {
        const maxLimit = getMaxImageNumber(selectedPage);
        if (maxLimit !== null && imageNumber > maxLimit) {
          return false;
        }
      }
      return true;
    }
    if (step === 4) {
      return !!selectedFile;
    }
    return false;
  };

  // Step indicator component
  const StepIndicator = () => {
    const totalSteps = selectedPage === "gallery" ? 4 : 3;
    const adjustedStep =
      selectedPage !== "gallery" && step > 2 ? step - 1 : step;

    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                adjustedStep === s
                  ? "bg-saffron-500 text-white shadow-lg shadow-saffron-500/30"
                  : adjustedStep > s
                    ? "bg-india-green-500 text-white"
                    : "bg-slate-200 text-slate-500"
              )}
            >
              {adjustedStep > s ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            {s < totalSteps && (
              <div
                className={cn(
                  "w-8 h-0.5 mx-1 transition-colors",
                  adjustedStep > s ? "bg-india-green-500" : "bg-slate-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-saffron-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-india-green-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-saffron-600 transition-colors"
          >
            Admin Dashboard
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">Picture Management</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
              Picture Management
            </h1>
            <p className="text-slate-600 mt-1">
              Simple page-based image management
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1.5 bg-white">
              <Images className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              <span className="font-semibold">{stats.total}</span>
              <span className="text-slate-500 ml-1 hidden sm:inline">
                Total
              </span>
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full h-auto gap-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-1.5 mb-6 shadow-md">
            <TabsTrigger
              value="upload"
              className={cn(
                "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-medium text-sm transition-all",
                activeTab === "upload"
                  ? "bg-gradient-to-r from-saffron-500 to-orange-500 text-white shadow-md"
                  : "text-slate-600 hover:bg-orange-50"
              )}
            >
              <Upload className="w-4 h-4" />
              Upload New
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className={cn(
                "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-medium text-sm transition-all",
                activeTab === "manage"
                  ? "bg-gradient-to-r from-india-green-500 to-green-500 text-white shadow-md"
                  : "text-slate-600 hover:bg-green-50"
              )}
            >
              <Images className="w-4 h-4" />
              Manage
              <span
                className={cn(
                  "ml-1 px-2 py-0.5 text-xs font-semibold rounded-full",
                  activeTab === "manage"
                    ? "bg-white/25 text-white"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {stats.total}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-0">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
              <StepIndicator />

              {/* Step 1: Select Page */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Select Page
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Choose where this image will appear
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PAGE_OPTIONS.filter((option) =>
                      pageAcceptsImages(option.value)
                    ).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedPage(option.value)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          selectedPage === option.value
                            ? "border-saffron-500 bg-saffron-50 shadow-md"
                            : "border-slate-200 hover:border-saffron-300 hover:bg-saffron-50/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900">
                            {option.label}
                          </span>
                          {option.maxImages !== null && (
                            <Badge variant="outline" className="text-xs">
                              Max: {option.maxImages}
                            </Badge>
                          )}
                          {option.maxImages === null && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-india-green-50 border-india-green-200 text-india-green-700"
                            >
                              Unlimited
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={goToNextStep}
                      disabled={!canProceed()}
                      className="bg-saffron-500 hover:bg-saffron-600 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Select Category (Gallery only) */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Select Category
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Gallery images need a category
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GALLERY_CATEGORIES.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedCategory(option.value)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          selectedCategory === option.value
                            ? "border-india-green-500 bg-india-green-50 shadow-md"
                            : "border-slate-200 hover:border-india-green-300 hover:bg-india-green-50/50"
                        )}
                      >
                        <span className="font-medium text-slate-900">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button onClick={goToPrevStep} variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      disabled={!canProceed()}
                      className="bg-saffron-500 hover:bg-saffron-600 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Image Number */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Image Number
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Choose or auto-assign the image position
                    </p>
                    {selectedPage &&
                      getMaxImageNumber(selectedPage) !== null && (
                        <p className="text-xs text-saffron-600 mt-2 font-medium">
                          This page supports up to{" "}
                          {getMaxImageNumber(selectedPage)} image
                          {getMaxImageNumber(selectedPage)! > 1 ? "s" : ""}
                        </p>
                      )}
                  </div>

                  {/* Auto-assign toggle */}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="autoAssign"
                      checked={autoAssign}
                      onChange={(e) => {
                        setAutoAssign(e.target.checked);
                        if (e.target.checked) {
                          setExistingSlot(null);
                        }
                      }}
                      className="w-4 h-4 text-saffron-500 rounded focus:ring-saffron-500"
                    />
                    <Label htmlFor="autoAssign" className="cursor-pointer">
                      Auto-assign next available number
                    </Label>
                  </div>

                  {/* Image number input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Image Number</Label>
                      {selectedPage &&
                        getMaxImageNumber(selectedPage) !== null && (
                          <span className="text-xs text-slate-500">
                            Range: 1 - {getMaxImageNumber(selectedPage)}
                          </span>
                        )}
                    </div>
                    <Input
                      type="number"
                      min={1}
                      max={
                        selectedPage
                          ? (getMaxImageNumber(selectedPage) ?? undefined)
                          : undefined
                      }
                      value={imageNumber}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        const maxLimit = selectedPage
                          ? getMaxImageNumber(selectedPage)
                          : null;
                        // Enforce max limit for non-gallery pages
                        if (maxLimit !== null && value > maxLimit) {
                          setImageNumber(maxLimit);
                        } else {
                          setImageNumber(value);
                        }
                      }}
                      disabled={autoAssign}
                      className={cn(
                        "text-lg font-medium",
                        autoAssign && "bg-slate-100"
                      )}
                    />
                    {isCheckingSlot && (
                      <p className="text-sm text-slate-500">
                        Checking if slot exists...
                      </p>
                    )}
                    {/* Show warning if trying to exceed limit */}
                    {selectedPage &&
                      !autoAssign &&
                      getMaxImageNumber(selectedPage) !== null &&
                      imageNumber > getMaxImageNumber(selectedPage)! && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Image number cannot exceed{" "}
                          {getMaxImageNumber(selectedPage)} for this page
                        </p>
                      )}
                  </div>

                  {/* Existing slot warning */}
                  {existingSlot && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-800">
                            This slot already has an image
                          </p>
                          <p className="text-sm text-amber-700 mt-1">
                            Uploading will replace the existing image.
                          </p>
                          <div className="mt-3">
                            <img
                              src={existingSlot.imageUrl}
                              alt="Existing"
                              className="w-32 h-24 object-cover rounded-lg border border-amber-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600">
                      <strong>Target:</strong>{" "}
                      {
                        PAGE_OPTIONS.find((p) => p.value === selectedPage)
                          ?.label
                      }
                      {selectedCategory &&
                        ` - ${GALLERY_CATEGORIES.find((c) => c.value === selectedCategory)?.label}`}
                      {" - Image "}
                      {imageNumber}
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button onClick={goToPrevStep} variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      disabled={!canProceed()}
                      className="bg-saffron-500 hover:bg-saffron-600 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Upload Image */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Upload Image
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Drag and drop or click to select
                    </p>
                  </div>

                  {/* Upload zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 text-center transition-all",
                      isDragging
                        ? "border-saffron-500 bg-saffron-50 scale-[1.01]"
                        : previewUrl
                          ? "border-india-green-300 bg-india-green-50/30"
                          : "border-slate-200 hover:border-saffron-400 hover:bg-saffron-50/30"
                    )}
                  >
                    {previewUrl ? (
                      <div className="space-y-4">
                        <div className="relative inline-block">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-xl shadow-lg"
                          />
                          <button
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl("");
                            }}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-india-green-700 font-medium">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Image ready to upload
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-saffron-100 to-orange-100 rounded-2xl flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-saffron-600" />
                        </div>
                        <div>
                          <p className="text-slate-700 font-medium">
                            Drag and drop your image here
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            or click to browse
                          </p>
                        </div>
                        <p className="text-xs text-slate-400">
                          PNG, JPG, GIF, WEBP (max 5MB)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Select Image
                            </span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600">
                      <strong>Uploading to:</strong>{" "}
                      {
                        PAGE_OPTIONS.find((p) => p.value === selectedPage)
                          ?.label
                      }
                      {selectedCategory &&
                        ` - ${GALLERY_CATEGORIES.find((c) => c.value === selectedCategory)?.label}`}
                      {" - Image "}
                      {imageNumber}
                      {existingSlot && (
                        <span className="text-amber-600 ml-2">(Replace)</span>
                      )}
                    </p>
                  </div>

                  {/* Progress */}
                  {isLoading && uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Uploading...</span>
                        <span className="text-saffron-600 font-medium">
                          {uploadProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-saffron-500 to-orange-500 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={goToPrevStep}
                      variant="outline"
                      disabled={isLoading}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={!canProceed() || isLoading}
                      className="bg-gradient-to-r from-saffron-500 to-orange-500 hover:from-saffron-600 hover:to-orange-600 text-white px-8"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Uploading...
                        </span>
                      ) : existingSlot ? (
                        <span className="flex items-center">
                          <Upload className="h-4 w-4 mr-2" />
                          Replace Image
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="mt-0">
            <ImageManager
              onDelete={handleDeleteClick}
              refreshTrigger={isFetching}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Replace Confirm Modal */}
      {existingSlot && (
        <ReplaceConfirmModal
          isOpen={showReplaceModal}
          existingImage={existingSlot}
          newPreviewUrl={previewUrl}
          onConfirm={handleReplaceConfirm}
          onCancel={() => setShowReplaceModal(false)}
          isLoading={isLoading}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOpen && pictureToDelete && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={() => setDeleteModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Delete Picture
                  </h3>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex gap-3">
                  <img
                    src={pictureToDelete.imageUrl}
                    alt="To delete"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full mb-1">
                      {PAGE_OPTIONS.find(
                        (o) => o.value === pictureToDelete.page
                      )?.label || pictureToDelete.page}
                    </span>
                    <p className="text-sm text-gray-700">
                      Image {pictureToDelete.imageNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setDeleteModalOpen(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
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
