import express from "express";
import {
  uploadPicture,
  getAllPictures,
  getPicturesByPage,
  getPictureById,
  updatePicture,
  deletePicture,
  getPictureStats,
} from "../controllers/pictureController";
import { isLoggedIn, isAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

// Public routes
router.get("/", isLoggedIn, isAdmin, getAllPictures);
router.get("/page/:pageToDisplay", isLoggedIn, isAdmin, getPicturesByPage);
router.get("/:id", isLoggedIn, isAdmin, getPictureById);

// Admin routes
router.post(
  "/upload",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  uploadPicture
);
router.put("/:id", isLoggedIn, isAdmin, updatePicture);
router.delete("/:id", isLoggedIn, isAdmin, deletePicture);
router.get("/stats/summary", isLoggedIn, isAdmin, getPictureStats);

export default router;
