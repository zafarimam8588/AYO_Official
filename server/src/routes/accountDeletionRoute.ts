// routes/accountDeletionRoutes.ts (Simplified)
import { Router } from "express";

import { requestAccountDeletion } from "../controllers/accountDeletionController";
import { isLoggedIn } from "../middleware/authMiddleware";

const router = Router();

// Single route for account deletion request (users can request their own deletion)
router.post("/request", isLoggedIn, requestAccountDeletion);

export default router;
