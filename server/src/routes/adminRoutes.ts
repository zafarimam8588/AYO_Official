// routes/adminRoutes.ts
import { Router } from "express";

import {
  getAllMembers,
  approveMember,
  rejectMember,
  getDashboardStats,
  getPendingDeletionRequests,
  getAllUsers,
  archiveUser,
  getArchivedUsers,
  getArchivedUserById,
  getMemberById,
} from "../controllers/adminController";
import {
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
} from "../middleware/authMiddleware";

const router = Router();

// Read-only routes (accessible by both admin and viewer)
router.get("/members", isLoggedIn, isAdminOrViewer, getAllMembers);
router.get("/member/:memberId", isLoggedIn, isAdminOrViewer, getMemberById);
router.get("/dashboard/stats", isLoggedIn, isAdminOrViewer, getDashboardStats);
router.get("/users", isLoggedIn, isAdminOrViewer, getAllUsers);
router.get("/archived-users", isLoggedIn, isAdminOrViewer, getArchivedUsers);
router.get(
  "/archived-users/:archivedUserId",
  isLoggedIn,
  isAdminOrViewer,
  getArchivedUserById
);
router.get(
  "/deletion-requests/:requestId",
  isLoggedIn,
  isAdminOrViewer,
  getPendingDeletionRequests
);

// Write routes (admin only - viewers blocked)
router.post(
  "/members/:memberId/approve",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  approveMember
);
router.post(
  "/members/:memberId/reject",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  rejectMember
);
router.post(
  "/users/:userId/archive",
  isLoggedIn,
  isAdminOrViewer,
  isFullAdmin,
  archiveUser
);

export default router;
