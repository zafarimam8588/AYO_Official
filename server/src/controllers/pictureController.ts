import { Request, Response } from "express";
import Picture from "../models/PictureModal";
import { IUser } from "../types";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "../services/cloudinaryService";

// Upload a new picture
export const uploadPicture = async (req: Request, res: Response) => {
  try {
    const {
      pageToDisplay = "gallery",
      positionOnPage = 1,
      imageDescription,
    } = req.body;

    if (!imageDescription) {
      return res.status(400).json({
        success: false,
        message: "Image description is required",
      });
    }

    if (!positionOnPage || positionOnPage < 1 || positionOnPage > 100) {
      return res.status(400).json({
        success: false,
        message: "Position on page must be between 1 and 100",
      });
    }

    // Check if file is uploaded
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    console.log(
      `📤 Uploading picture: ${file.originalname} for page: ${pageToDisplay}`
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
    const user = req.user as IUser;
    const picture = await Picture.create({
      pageToDisplay,
      positionOnPage: parseInt(positionOnPage),
      imageDescription,
      imageUrl: uploadResult.url,
      cloudinaryPublicId: uploadResult.publicId,
      uploadedBy: user?._id,
    });

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
    const { page, limit = 20, pageToDisplay } = req.query;

    const query: any = {};
    if (pageToDisplay) {
      query.pageToDisplay = pageToDisplay;
    }

    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string);

    const skip = (pageNumber - 1) * limitNumber;

    const pictures = await Picture.find(query)
      .populate("uploadedBy", "fullName email")
      .sort({ createdAt: -1 })
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
    const { pageToDisplay } = req.params;

    const pictures = await Picture.find({ pageToDisplay })
      .populate("uploadedBy", "fullName email")
      .sort({ positionOnPage: 1, createdAt: -1 });

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

    const picture = await Picture.findById(id).populate(
      "uploadedBy",
      "fullName email"
    );

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

// Update picture details
export const updatePicture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pageToDisplay, imageDescription } = req.body;

    const picture = await Picture.findById(id);

    if (!picture) {
      return res.status(404).json({
        success: false,
        message: "Picture not found",
      });
    }

    // Update fields
    if (pageToDisplay) picture.pageToDisplay = pageToDisplay;
    if (imageDescription) picture.imageDescription = imageDescription;

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
        // Continue with database deletion even if Cloudinary delete fails
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

// Get picture statistics
export const getPictureStats = async (req: Request, res: Response) => {
  try {
    const stats = await Picture.aggregate([
      {
        $group: {
          _id: "$pageToDisplay",
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
