import express from "express";

import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  replyToContactMessage,
  deleteContactMessage,
  getContactMessageStats,
} from "../controllers/contactMessageController";
import {
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
} from "../middleware/authMiddleware";

const router = express.Router();

// Public route - Submit contact form
router.post("/", createContactMessage);

// Admin routes - require authentication
// Note: /stats must come before /:id to avoid route collision
// Read-only routes (accessible by both admin and viewer)
router.get("/stats", isLoggedIn, isAdminOrViewer, getContactMessageStats);
router.get("/", isLoggedIn, isAdminOrViewer, getAllContactMessages);
router.get("/:id", isLoggedIn, isAdminOrViewer, getContactMessageById);

// Write routes (admin only - viewers blocked)
router.post(
  "/:id/reply",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  replyToContactMessage
);
router.delete(
  "/:id",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  deleteContactMessage
);

export default router;
