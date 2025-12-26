import { useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { uploadPicture } from "@/services/pictureService";
import { PAGE_OPTIONS } from "@/types";
import type { PictureFormData } from "@/types";

export const PictureUpload = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState<{
    pageToDisplay: string;
    positionOnPage: number;
    imageDescription: string;
    image: File | null;
  }>({
    pageToDisplay: "gallery",
    positionOnPage: 1,
    imageDescription: "",
    image: null,
  });

  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.image) {
      setError("Please select an image");
      return;
    }

    if (!formData.imageDescription.trim()) {
      setError("Please enter image description");
      return;
    }

    if (formData.positionOnPage < 1 || formData.positionOnPage > 100) {
      setError("Position must be between 1 and 100");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      await uploadPicture(formData as PictureFormData, (progressEvent: any) => {
        setUploadProgress(progressEvent.percentCompleted || 0);
      });

      setSuccess("Picture uploaded successfully!");
      setFormData({
        pageToDisplay: "gallery",
        positionOnPage: 1,
        imageDescription: "",
        image: null,
      });
      setPreview("");
      setUploadProgress(0);

      if (onSuccess) {
        onSuccess();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-6 h-6 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-800">Upload Picture</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Page Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page to Display *
          </label>
          <select
            value={formData.pageToDisplay}
            onChange={(e) =>
              setFormData({ ...formData, pageToDisplay: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            {PAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Position on Page */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position on Page * (1-100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={formData.positionOnPage}
            onChange={(e) =>
              setFormData({
                ...formData,
                positionOnPage: parseInt(e.target.value) || 1,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Lower numbers appear first. Use this to control image order.
          </p>
        </div>

        {/* Image Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Description *
          </label>
          <textarea
            value={formData.imageDescription}
            onChange={(e) =>
              setFormData({ ...formData, imageDescription: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            rows={3}
            maxLength={500}
            placeholder="Enter a description for this image..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.imageDescription.length}/500 characters
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Image * (Max 5MB)
          </label>

          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border-2 border-orange-200"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading || !formData.image}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {uploading ? "Uploading..." : "Upload Picture"}
        </button>
      </form>
    </div>
  );
};
