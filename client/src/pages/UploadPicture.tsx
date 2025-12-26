import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Edit,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  uploadPicture,
  getAllPictures,
  deletePicture,
  updatePicture,
} from "@/services/pictureService";
import type { Picture, PictureFormData } from "@/types";
import { PAGE_OPTIONS } from "@/types";

interface FormInputs {
  pageToDisplay: string;
  positionOnPage: number;
  imageDescription: string;
}

export default function UploadPicture() {
  const navigate = useNavigate();
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [filteredPictures, setFilteredPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [filterPage, setFilterPage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingPicture, setEditingPicture] = useState<Picture | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState<Picture | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputs>();

  // Fetch all pictures
  const fetchPictures = async () => {
    try {
      setIsFetching(true);
      const response = await getAllPictures({ limit: 100 });
      setPictures(response.data);
      setFilteredPictures(response.data);
    } catch (error: any) {
      console.error("Error fetching pictures:", error);
      toast.error("Failed to load pictures");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  // Filter pictures
  useEffect(() => {
    let filtered = pictures;

    if (filterPage !== "all") {
      filtered = filtered.filter((pic) => pic.pageToDisplay === filterPage);
    }

    if (searchQuery) {
      filtered = filtered.filter((pic) =>
        pic.imageDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPictures(filtered);
  }, [filterPage, searchQuery, pictures]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (editingPicture) {
      // Update existing picture
      try {
        setIsLoading(true);
        await updatePicture(editingPicture._id, {
          pageToDisplay: data.pageToDisplay,
          imageDescription: data.imageDescription,
        });

        toast.success("Picture updated successfully!", {
          icon: "✅",
          duration: 3000,
        });

        fetchPictures();
        resetForm();
      } catch (error: any) {
        console.error("Error updating picture:", error);
        toast.error(
          error.response?.data?.message || "Failed to update picture"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // Upload new picture
      if (!selectedFile) {
        toast.error("Please select an image to upload");
        return;
      }

      try {
        setIsLoading(true);
        setUploadProgress(0);

        const formData: PictureFormData = {
          pageToDisplay: data.pageToDisplay,
          positionOnPage: data.positionOnPage || 1,
          imageDescription: data.imageDescription,
          image: selectedFile,
        };

        await uploadPicture(formData, (progressEvent) => {
          setUploadProgress(progressEvent.percentCompleted);
        });

        toast.success("Picture uploaded successfully!", {
          icon: "🎉",
          duration: 3000,
        });

        fetchPictures();
        resetForm();
        setUploadProgress(0);
      } catch (error: any) {
        console.error("Error uploading picture:", error);
        toast.error(
          error.response?.data?.message || "Failed to upload picture"
        );
        setUploadProgress(0);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle delete - Open modal
  const handleDeleteClick = (picture: Picture) => {
    setPictureToDelete(picture);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!pictureToDelete) return;

    try {
      setIsDeleting(true);
      await deletePicture(pictureToDelete._id);
      toast.success("Picture deleted successfully", {
        icon: "🗑️",
        duration: 3000,
      });
      fetchPictures();
      setDeleteModalOpen(false);
      setPictureToDelete(null);
    } catch (error: any) {
      console.error("Error deleting picture:", error);
      toast.error(error.response?.data?.message || "Failed to delete picture");
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPictureToDelete(null);
  };

  // Handle edit
  const handleEdit = (picture: Picture) => {
    setEditingPicture(picture);
    setValue("pageToDisplay", picture.pageToDisplay);
    setValue("imageDescription", picture.imageDescription);
    setPreviewUrl(picture.imageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const resetForm = () => {
    reset();
    setSelectedFile(null);
    setPreviewUrl("");
    setEditingPicture(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
            Picture Management
          </h1>
          <p className="text-slate-600">
            Upload and manage pictures for different pages
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingPicture ? "Edit Picture" : "Upload New Picture"}
              </h2>
              {editingPicture && (
                <Button
                  onClick={resetForm}
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Page Selection */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="pageToDisplay"
                  className="text-sm font-semibold text-slate-700 uppercase tracking-wide"
                >
                  Page to Display
                </Label>
                <div className="relative">
                  <select
                    id="pageToDisplay"
                    className={`w-full px-5 py-3.5 bg-gradient-to-br from-slate-50 to-white border rounded-2xl font-medium text-slate-700 appearance-none cursor-pointer shadow-sm
                      hover:shadow-md hover:scale-[1.01] 
                      focus:scale-[1.01] focus:outline-none focus:ring-2 
                      transition-all duration-300 ease-out border-slate-200 focus:ring-orange-200 focus:border-orange-400`}
                    disabled={isLoading}
                    defaultValue={editingPicture?.pageToDisplay || "gallery"}
                    {...register("pageToDisplay")}
                  >
                    {PAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Position on Page */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="positionOnPage"
                  className="text-sm font-semibold text-slate-700 uppercase tracking-wide"
                >
                  Position on Page (1-100)
                </Label>
                <Input
                  id="positionOnPage"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Enter position (1-100)"
                  className={`bg-gradient-to-br from-slate-50 to-white border rounded-2xl px-5 py-3.5 font-medium text-slate-700 shadow-sm
                    hover:shadow-md hover:scale-[1.01]
                    focus:scale-[1.01] focus:outline-none focus:ring-2
                    transition-all duration-300 ease-out border-slate-200 focus:ring-orange-200 focus:border-orange-400`}
                  disabled={isLoading}
                  defaultValue={editingPicture?.positionOnPage || 1}
                  {...register("positionOnPage", {
                    valueAsNumber: true,
                    min: { value: 1, message: "Position must be at least 1" },
                    max: { value: 100, message: "Position cannot exceed 100" },
                  })}
                />
                <p className="text-xs text-slate-500">
                  Lower numbers appear first. Use this to control image order on
                  the page.
                </p>
              </div>

              {/* Image Description */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="imageDescription"
                  className="text-sm font-semibold text-slate-700 uppercase tracking-wide"
                >
                  Image Description
                </Label>
                <Textarea
                  id="imageDescription"
                  placeholder="Describe what this image represents..."
                  className={`resize-none bg-gradient-to-br from-slate-50 to-white border rounded-2xl px-5 py-3.5 font-medium text-slate-700 shadow-sm
                    hover:shadow-md hover:scale-[1.01]
                    focus:scale-[1.01] focus:outline-none focus:ring-2
                    transition-all duration-300 ease-out ${
                      errors.imageDescription
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                        : "border-slate-200 focus:ring-green-200 focus:border-green-400"
                    }`}
                  rows={4}
                  disabled={isLoading}
                  {...register("imageDescription", {
                    required: "Description is required",
                    minLength: {
                      value: 1,
                      message: "Description must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters",
                    },
                  })}
                />
                {errors.imageDescription && (
                  <p className="text-red-500 text-xs flex items-center gap-1.5 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.imageDescription.message}
                  </p>
                )}
              </div>

              {/* File Upload */}
              {!editingPicture && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Upload Image
                  </Label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-green-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                    <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-gradient-to-br from-slate-50 to-white hover:border-orange-300 hover:bg-white transition-all duration-300">
                      {previewUrl ? (
                        <div className="space-y-5">
                          <div className="relative inline-block">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="max-h-56 mx-auto rounded-xl shadow-lg ring-2 ring-slate-200"
                            />
                          </div>
                          <div className="flex justify-center">
                            <Button
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl("");
                              }}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-100 to-green-100 rounded-2xl flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-slate-700 font-medium mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">
                              PNG, JPG, GIF, WEBP (max 5MB)
                            </p>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        disabled={isLoading}
                      />
                      {!previewUrl && (
                        <label
                          htmlFor="file-upload"
                          className="mt-5 inline-block cursor-pointer"
                        >
                          <Button
                            type="button"
                            variant="outline"
                            className="border-slate-300 hover:bg-slate-50 hover:border-slate-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Select Image
                            </span>
                          </Button>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Preview for editing */}
              {editingPicture && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Current Image
                  </Label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-green-400 rounded-2xl opacity-20 blur" />
                    <img
                      src={editingPicture.imageUrl}
                      alt={editingPicture.imageDescription}
                      className="relative w-full rounded-2xl shadow-lg ring-2 ring-slate-200"
                    />
                  </div>
                </div>
              )}

              {/* Upload Progress Bar */}
              {isLoading && !editingPicture && uploadProgress > 0 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 font-semibold">
                      Uploading to cloud
                    </span>
                    <span className="text-green-600 font-bold tabular-nums">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="relative w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || (!editingPicture && !selectedFile)}
                className="relative w-full h-14 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                      {editingPicture
                        ? "Updating..."
                        : `Uploading... ${uploadProgress}%`}
                    </>
                  ) : (
                    <>
                      {editingPicture ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Update Picture
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Picture
                        </>
                      )}
                    </>
                  )}
                </span>
              </Button>
            </form>
          </div>

          {/* Gallery */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100/50 p-8 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Picture Gallery
                <span className="ml-3 text-lg font-medium text-slate-500">
                  ({filteredPictures.length})
                </span>
              </h2>

              <div className="space-y-5">
                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-200" />
                  <Input
                    type="text"
                    placeholder="Search by description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-5 py-3.5 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl font-medium text-slate-700 shadow-sm
                      hover:shadow-md hover:scale-[1.01]
                      focus:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400
                      transition-all duration-300 ease-out"
                  />
                </div>

                {/* Filter by Page */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Filter className="h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-200" />
                  </div>
                  <select
                    value={filterPage}
                    onChange={(e) => setFilterPage(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl font-medium text-slate-700 appearance-none cursor-pointer shadow-sm
                      hover:shadow-md hover:scale-[1.01]
                      focus:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400
                      transition-all duration-300 ease-out"
                  >
                    <option value="all">All Pages</option>
                    {PAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Pictures Grid */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {isFetching ? (
                <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-lg">
                  <div className="relative inline-block">
                    <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500 mx-auto" />
                  </div>
                  <p className="mt-6 text-slate-600 font-medium">
                    Loading pictures...
                  </p>
                </div>
              ) : filteredPictures.length === 0 ? (
                <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-300 shadow-lg">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">
                    No pictures found
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Upload your first picture to get started
                  </p>
                </div>
              ) : (
                filteredPictures.map((picture) => (
                  <div
                    key={picture._id}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200 p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex gap-5">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-green-400 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                        <img
                          src={picture.imageUrl}
                          alt={picture.imageDescription}
                          className="relative w-28 h-28 object-cover rounded-xl ring-2 ring-slate-200 group-hover:ring-slate-300 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-orange-100 to-green-100 text-orange-700 text-xs font-bold rounded-full mb-2 shadow-sm">
                              {PAGE_OPTIONS.find(
                                (opt) => opt.value === picture.pageToDisplay
                              )?.label || picture.pageToDisplay}
                            </span>
                            <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                              {picture.imageDescription}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 mt-4">
                          <Button
                            onClick={() => handleEdit(picture)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1.5" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(picture)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && pictureToDelete && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity"
            onClick={cancelDelete}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-in fade-in zoom-in duration-300">
              {/* Header */}
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

              {/* Picture Preview */}
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex gap-3">
                  <img
                    src={pictureToDelete.imageUrl}
                    alt={pictureToDelete.imageDescription}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full mb-1">
                      {PAGE_OPTIONS.find(
                        (opt) => opt.value === pictureToDelete.pageToDisplay
                      )?.label || pictureToDelete.pageToDisplay}
                    </span>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {pictureToDelete.imageDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">
                    Are you sure you want to delete this picture? This will
                    permanently remove it from the system and cannot be
                    recovered.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={cancelDelete}
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                  disabled={isDeleting}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Picture
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #22c55e);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #16a34a);
        }
      `}</style>
    </div>
  );
}
