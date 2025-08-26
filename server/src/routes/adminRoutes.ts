// routes/adminRoutes.ts
import { Router } from "express";
import {
  getAllMembers,
  approveMember,
  rejectMember,
  getDashboardStats,
  getPendingDeletionRequests,
} from "../controllers/adminController";
import { isLoggedIn, isAdmin } from "../middleware/authMiddleware";

const router = Router();

// Member management routes
router.get("/all-members", isLoggedIn, isAdmin, getAllMembers);
router.post(
  "/members/:memberId/approve-member",
  isLoggedIn,
  isAdmin,
  approveMember
);
router.post(
  "/members/:memberId/reject-member",
  isLoggedIn,
  isAdmin,
  rejectMember
);

// Dashboard routes
router.get("/dashboard/stats", isLoggedIn, isAdmin, getDashboardStats);

// Account deletion management routes
router.get(
  "/deletion-requests",
  isLoggedIn,
  isAdmin,
  getPendingDeletionRequests
);

export default router;
