// routes/accountDeletionRoutes.ts (Simplified)
import { Router } from "express";
import { requestAccountDeletion } from "../controllers/accountDeletionController";
import { isLoggedIn, isAdmin } from "../middleware/authMiddleware";

const router = Router();

// Single route for account deletion request
router.post("/request", isLoggedIn, isAdmin, requestAccountDeletion);

export default router;
