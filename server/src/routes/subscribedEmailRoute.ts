import { Router } from "express";

import {
  getAllEmails,
  SubscribedEmail,
  deleteSubscribedEmail,
  sendEmailToAllSubscribers,
} from "../controllers/subscribedEmailController";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware";

const router = Router();

router.post("/subscribe-to-email", SubscribedEmail);

router.get("/allEmails", isLoggedIn, isAdmin, getAllEmails);

router.delete("/:id", isLoggedIn, isAdmin, deleteSubscribedEmail);

router.post("/send-to-all", isLoggedIn, isAdmin, sendEmailToAllSubscribers);

export default router;
