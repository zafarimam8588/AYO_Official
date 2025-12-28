import express from "express";

import {
  uploadPicture,
  getAllPictures,
  getPicturesByPage,
  getPictureById,
  updatePicture,
  deletePicture,
  getPictureStats,
  getGalleryByCategories,
  getImageBySlot,
  getNextImageNumber,
  replacePictureImage,
} from "../controllers/pictureController";
import { isLoggedIn, isAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

// ==================== Public routes ====================
// (no auth required for viewing gallery)

// Get all pictures with optional filtering
router.get("/", getAllPictures);

// Get gallery pictures grouped by category
router.get("/gallery/categorized", getGalleryByCategories);

// Get pictures by page
router.get("/page/:page", getPicturesByPage);

// Check if image slot exists
router.get("/slot", getImageBySlot);

// Get next available image number for a page/category
router.get("/next-number", getNextImageNumber);

// Get picture statistics (admin only)
router.get("/stats/summary", isLoggedIn, isAdmin, getPictureStats);

// Single picture by ID (must be after other /xyz routes to avoid conflicts)
router.get("/:id", getPictureById);

// ==================== Admin routes ====================

// Upload new picture
router.post(
  "/upload",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  uploadPicture
);

// Update picture metadata (move to different slot)
router.put("/:id", isLoggedIn, isAdmin, updatePicture);

// Replace picture image (keep slot)
router.put(
  "/:id/replace",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  replacePictureImage
);

// Delete picture
router.delete("/:id", isLoggedIn, isAdmin, deletePicture);

export default router;
