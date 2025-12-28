import express from "express";

import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  replyToContactMessage,
  deleteContactMessage,
  getContactMessageStats,
} from "../controllers/contactMessageController";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware";

const router = express.Router();

// Public route - Submit contact form
router.post("/", createContactMessage);

// Admin routes - require authentication
// Note: /stats must come before /:id to avoid route collision
router.get("/stats", isLoggedIn, isAdmin, getContactMessageStats);
router.get("/", isLoggedIn, isAdmin, getAllContactMessages);
router.get("/:id", isLoggedIn, isAdmin, getContactMessageById);
router.post("/:id/reply", isLoggedIn, isAdmin, replyToContactMessage);
router.delete("/:id", isLoggedIn, isAdmin, deleteContactMessage);

export default router;
