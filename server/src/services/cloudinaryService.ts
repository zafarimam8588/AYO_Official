import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary with SHA-256
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

/**
 * Upload buffer file to Cloudinary
 */
export const uploadBufferToCloudinary = async (
  fileBuffer: Buffer,
  filename: string,
  folder: string = "ngo-pictures"
): Promise<CloudinaryUploadResult> => {
  try {
    return new Promise((resolve, _reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
          public_id: `${Date.now()}-${filename
            .split(".")[0]
            .replace(/[^a-zA-Z0-9]/g, "_")}`,
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            resolve({
              success: false,
              error: error.message || "Upload failed",
            });
          } else if (result) {
            console.log("✅ Cloudinary upload successful:", result.secure_url);
            resolve({
              success: true,
              url: result.secure_url,
              publicId: result.public_id,
            });
          } else {
            resolve({
              success: false,
              error: "No result from Cloudinary",
            });
          }
        }
      );

      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error("❌ Cloudinary service error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteFromCloudinary = async (
  publicId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === "ok" || result.result === "not found",
    };
  } catch (error) {
    console.error("❌ Cloudinary delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
};
