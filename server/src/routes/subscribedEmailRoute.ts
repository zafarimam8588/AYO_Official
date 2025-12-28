import { Router } from "express";

import {
  getAllEmails,
  SubscribedEmail,
  deleteSubscribedEmail,
  sendEmailToAllSubscribers,
} from "../controllers/subscribedEmailController";
import {
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
} from "../middleware/authMiddleware";

const router = Router();

// Public route
router.post("/subscribe-to-email", SubscribedEmail);

// Read-only route (accessible by both admin and viewer)
router.get("/allEmails", isLoggedIn, isAdminOrViewer, getAllEmails);

// Write routes (admin only - viewers blocked)
router.delete(
  "/:id",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  deleteSubscribedEmail
);
router.post(
  "/send-to-all",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  sendEmailToAllSubscribers
);

export default router;
