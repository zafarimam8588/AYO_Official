import { Request, Response } from "express";

import {
  PAGE_OPTIONS,
  GALLERY_CATEGORIES,
  type PageOption,
  type GalleryCategory,
  pageAcceptsImages,
  isValidImageNumber,
  getMaxImageNumber,
  PAGE_LABELS,
} from "../constants/pictureConstants";
import Picture from "../models/PictureModal";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "../services/cloudinaryService";

// Upload a new picture
export const uploadPicture = async (req: Request, res: Response) => {
  try {
    const { page, imageNumber, category } = req.body;

    // Validate required fields
    if (!page) {
      return res.status(400).json({
        success: false,
        message: "Page is required",
      });
    }

    if (!PAGE_OPTIONS.includes(page as PageOption)) {
      return res.status(400).json({
        success: false,
        message: `Invalid page. Must be one of: ${PAGE_OPTIONS.join(", ")}`,
      });
    }

    // Check if page accepts images
    if (!pageAcceptsImages(page as PageOption)) {
      return res.status(400).json({
        success: false,
        message: `${PAGE_LABELS[page as PageOption]} does not support image uploads`,
      });
    }

    if (!imageNumber || parseInt(imageNumber) < 1) {
      return res.status(400).json({
        success: false,
        message: "Image number is required and must be at least 1",
      });
    }

    // Validate image number against page limit
    const parsedImageNumber = parseInt(imageNumber);
    if (!isValidImageNumber(page as PageOption, parsedImageNumber)) {
      const maxLimit = getMaxImageNumber(page as PageOption);
      return res.status(400).json({
        success: false,
        message: `${PAGE_LABELS[page as PageOption]} supports up to ${maxLimit} image${maxLimit! > 1 ? "s" : ""}. Image number ${parsedImageNumber} exceeds this limit.`,
      });
    }

    // Validate category for gallery page
    if (page === "gallery") {
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category is required for gallery images",
        });
      }
      if (!GALLERY_CATEGORIES.includes(category as GalleryCategory)) {
        return res.status(400).json({
          success: false,
          message: `Invalid category. Must be one of: ${GALLERY_CATEGORIES.join(", ")}`,
        });
      }
    }

    // Check if file is uploaded
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Build query to check if slot exists
    const slotQuery: any = {
      page,
      imageNumber: parseInt(imageNumber),
    };
    if (page === "gallery") {
      slotQuery.category = category;
    }

    // Check if slot already exists
    const existingPicture = await Picture.findOne(slotQuery);
    if (existingPicture) {
      return res.status(409).json({
        success: false,
        message: "Image slot already exists",
        existing: {
          id: existingPicture._id,
          imageUrl: existingPicture.imageUrl,
          page: existingPicture.page,
          imageNumber: existingPicture.imageNumber,
          category: existingPicture.category,
        },
      });
    }

    console.log(
      `📤 Uploading picture: ${file.originalname} for page: ${page}, number: ${imageNumber}`
    );

    // Upload to Cloudinary using buffer
    const uploadResult = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "ngo-pictures"
    );

    if (!uploadResult.success || !uploadResult.url) {
      throw new Error(uploadResult.error || "Cloudinary upload failed");
    }

    console.log(`✅ Cloudinary upload successful: ${uploadResult.url}`);

    // Create picture record
    const pictureData: any = {
      page,
      imageNumber: parseInt(imageNumber),
      imageUrl: uploadResult.url,
      cloudinaryPublicId: uploadResult.publicId,
    };

    // Add category only for gallery
    if (page === "gallery") {
      pictureData.category = category;
    }

    const picture = await Picture.create(pictureData);

    console.log(`💾 Picture saved to database: ${picture._id}`);

    res.status(201).json({
      success: true,
      message: "Picture uploaded successfully",
      data: picture,
    });
  } catch (error: any) {
    console.error("❌ Upload picture error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload picture",
    });
  }
};

// Get all pictures with optional filtering
export const getAllPictures = async (req: Request, res: Response) => {
  try {
    const { page: pageNum, limit = 100, pageName, category } = req.query;

    const query: any = {};
    if (pageName) {
      query.page = pageName;
    }
    if (category) {
      query.category = category;
    }

    const pageNumber = parseInt(pageNum as string) || 1;
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const pictures = await Picture.find(query)
      .sort({ page: 1, category: 1, imageNumber: 1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Picture.countDocuments(query);

    res.status(200).json({
      success: true,
      data: pictures,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error: any) {
    console.error("Get pictures error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch pictures",
    });
  }
};

// Get pictures by page
export const getPicturesByPage = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;

    const pictures = await Picture.find({ page }).sort({ imageNumber: 1 });

    res.status(200).json({
      success: true,
      data: pictures,
      count: pictures.length,
    });
  } catch (error: any) {
    console.error("Get pictures by page error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch pictures",
    });
  }
};

// Get single picture by ID
export const getPictureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const picture = await Picture.findById(id);

    if (!picture) {
      return res.status(404).json({
        success: false,
        message: "Picture not found",
      });
    }

    res.status(200).json({
      success: true,
      data: picture,
    });
  } catch (error: any) {
    console.error("Get picture error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch picture",
    });
  }
};

// Update picture details (move to different slot)
export const updatePicture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page, imageNumber, category } = req.body;

    const picture = await Picture.findById(id);

    if (!picture) {
      return res.status(404).json({
        success: false,
        message: "Picture not found",
      });
    }

    // Check if new slot is already taken (if changing slot)
    const newPage = page || picture.page;
    const newImageNumber = imageNumber || picture.imageNumber;
    const newCategory =
      page === "gallery" ? category || picture.category : undefined;

    // Validate new page accepts images
    if (page && !pageAcceptsImages(page as PageOption)) {
      return res.status(400).json({
        success: false,
        message: `${PAGE_LABELS[page as PageOption]} does not support image uploads`,
      });
    }

    // Validate new image number against page limit
    if (
      imageNumber &&
      !isValidImageNumber(newPage as PageOption, newImageNumber)
    ) {
      const maxLimit = getMaxImageNumber(newPage as PageOption);
      return res.status(400).json({
        success: false,
        message: `${PAGE_LABELS[newPage as PageOption]} supports up to ${maxLimit} image${maxLimit! > 1 ? "s" : ""}. Image number ${newImageNumber} exceeds this limit.`,
      });
    }

    if (
      newPage !== picture.page ||
      newImageNumber !== picture.imageNumber ||
      newCategory !== picture.category
    ) {
      const slotQuery: any = {
        page: newPage,
        imageNumber: newImageNumber,
        _id: { $ne: id },
      };
      if (newPage === "gallery") {
        slotQuery.category = newCategory;
      }

      const existingPicture = await Picture.findOne(slotQuery);
      if (existingPicture) {
        return res.status(409).json({
          success: false,
          message: "Target slot is already occupied",
          existing: {
            id: existingPicture._id,
            imageUrl: existingPicture.imageUrl,
            page: existingPicture.page,
            imageNumber: existingPicture.imageNumber,
            category: existingPicture.category,
          },
        });
      }
    }

    // Update fields
    if (page !== undefined) {
      picture.page = page;
    }
    if (imageNumber !== undefined) {
      picture.imageNumber = imageNumber;
    }
    if (page === "gallery" && category !== undefined) {
      picture.category = category;
    } else if (page !== "gallery") {
      picture.category = undefined;
    }

    await picture.save();

    res.status(200).json({
      success: true,
      message: "Picture updated successfully",
      data: picture,
    });
  } catch (error: any) {
    console.error("Update picture error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update picture",
    });
  }
};

// Delete picture
export const deletePicture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const picture = await Picture.findById(id);

    if (!picture) {
      return res.status(404).json({
        success: false,
        message: "Picture not found",
      });
    }

    // Delete from Cloudinary if publicId exists
    if (picture.cloudinaryPublicId) {
      console.log(`🗑️ Deleting from Cloudinary: ${picture.cloudinaryPublicId}`);
      const deleteResult = await deleteFromCloudinary(
        picture.cloudinaryPublicId
      );

      if (!deleteResult.success) {
        console.warn(
          `⚠️ Failed to delete from Cloudinary: ${deleteResult.error}`
        );
      } else {
        console.log(`✅ Deleted from Cloudinary successfully`);
      }
    }

    // Delete from database
    await Picture.findByIdAndDelete(id);
    console.log(`💾 Picture deleted from database: ${id}`);

    res.status(200).json({
      success: true,
      message: "Picture deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Delete picture error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete picture",
    });
  }
};

// Get gallery pictures grouped by category
export const getGalleryByCategories = async (req: Request, res: Response) => {
  try {
    const pictures = await Picture.find({ page: "gallery" }).sort({
      category: 1,
      imageNumber: 1,
    });

    // Group by category
    const categorized: Record<string, typeof pictures> = {
      "events-activities": [],
      "community-work": [],
      "education-training": [],
      "awareness-campaigns": [],
      general: [],
    };

    pictures.forEach((picture) => {
      const category = picture.category || "general";
      if (categorized[category]) {
        categorized[category].push(picture);
      } else {
        categorized.general.push(picture);
      }
    });

    res.status(200).json({
      success: true,
      data: {
        all: pictures,
        categorized,
        total: pictures.length,
      },
    });
  } catch (error: any) {
    console.error("Get gallery by categories error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch gallery pictures",
    });
  }
};

// Get picture statistics
export const getPictureStats = async (req: Request, res: Response) => {
  try {
    const stats = await Picture.aggregate([
      {
        $group: {
          _id: "$page",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const totalPictures = await Picture.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        total: totalPictures,
        byPage: stats,
      },
    });
  } catch (error: any) {
    console.error("Get picture stats error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch picture statistics",
    });
  }
};

// Get image by slot (page + imageNumber + category)
export const getImageBySlot = async (req: Request, res: Response) => {
  try {
    const { page, imageNumber, category } = req.query;

    if (!page || !imageNumber) {
      return res.status(400).json({
        success: false,
        message: "Page and image number are required",
      });
    }

    const query: any = {
      page,
      imageNumber: parseInt(imageNumber as string),
    };

    if (page === "gallery" && category) {
      query.category = category;
    }

    const picture = await Picture.findOne(query);

    res.status(200).json({
      success: true,
      data: picture,
      exists: !!picture,
    });
  } catch (error: any) {
    console.error("Get image by slot error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch image by slot",
    });
  }
};

// Get next available image number for a page/category
export const getNextImageNumber = async (req: Request, res: Response) => {
  try {
    const { page, category } = req.query;

    if (!page) {
      return res.status(400).json({
        success: false,
        message: "Page is required",
      });
    }

    const query: any = { page };
    if (page === "gallery" && category) {
      query.category = category;
    }

    const lastImage = await Picture.findOne(query).sort({ imageNumber: -1 });
    const nextNumber = lastImage ? lastImage.imageNumber + 1 : 1;

    res.status(200).json({
      success: true,
      data: {
        nextImageNumber: nextNumber,
      },
    });
  } catch (error: any) {
    console.error("Get next image number error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get next image number",
    });
  }
};

// Replace picture image (keep slot, upload new image)
export const replacePictureImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const picture = await Picture.findById(id);
    if (!picture) {
      return res.status(404).json({
        success: false,
        message: "Picture not found",
      });
    }

    console.log(`🔄 Replacing image for picture: ${id}`);

    // Delete old image from Cloudinary
    if (picture.cloudinaryPublicId) {
      console.log(
        `🗑️ Deleting old image from Cloudinary: ${picture.cloudinaryPublicId}`
      );
      const deleteResult = await deleteFromCloudinary(
        picture.cloudinaryPublicId
      );
      if (!deleteResult.success) {
        console.warn(
          `⚠️ Failed to delete old image from Cloudinary: ${deleteResult.error}`
        );
      }
    }

    // Upload new image
    const uploadResult = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname,
      "ngo-pictures"
    );

    if (!uploadResult.success || !uploadResult.url) {
      throw new Error(uploadResult.error || "Cloudinary upload failed");
    }

    console.log(`✅ New image uploaded: ${uploadResult.url}`);

    // Update picture record
    picture.imageUrl = uploadResult.url;
    picture.cloudinaryPublicId = uploadResult.publicId;

    await picture.save();

    res.status(200).json({
      success: true,
      message: "Image replaced successfully",
      data: picture,
    });
  } catch (error: any) {
    console.error("❌ Replace picture image error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to replace image",
    });
  }
};
