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
import {
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
} from "../middleware/authMiddleware";
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

// Get picture statistics (accessible by both admin and viewer)
router.get("/stats/summary", isLoggedIn, isAdminOrViewer, getPictureStats);

// Single picture by ID (must be after other /xyz routes to avoid conflicts)
router.get("/:id", getPictureById);

// ==================== Admin routes (write operations) ====================

// Upload new picture (admin only - viewers blocked)
router.post(
  "/upload",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  upload.single("image"),
  uploadPicture
);

// Update picture metadata (move to different slot) (admin only)
router.put("/:id", isLoggedIn, isAdminOrViewer, isFullAdmin, updatePicture);

// Replace picture image (keep slot) (admin only)
router.put(
  "/:id/replace",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  upload.single("image"),
  replacePictureImage
);

// Delete picture (admin only)
router.delete("/:id", isLoggedIn, isAdminOrViewer, isFullAdmin, deletePicture);

export default router;
