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
import { isLoggedIn, isAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/members", isLoggedIn, isAdmin, getAllMembers);

router.get("/member/:memberId", isLoggedIn, isAdmin, getMemberById);

router.post("/members/:memberId/approve", isLoggedIn, isAdmin, approveMember);

router.post("/members/:memberId/reject", isLoggedIn, isAdmin, rejectMember);

router.get("/dashboard/stats", isLoggedIn, isAdmin, getDashboardStats);

router.get("/users", isLoggedIn, isAdmin, getAllUsers);

// Archive user (soft delete - moves to ArchivedUsers collection)
router.post("/users/:userId/archive", isLoggedIn, isAdmin, archiveUser);

// Archived users management
router.get("/archived-users", isLoggedIn, isAdmin, getArchivedUsers);
router.get(
  "/archived-users/:archivedUserId",
  isLoggedIn,
  isAdmin,
  getArchivedUserById
);

// Approve user deletion request (archives user)
router.get(
  "/deletion-requests/:requestId",
  isLoggedIn,
  isAdmin,
  getPendingDeletionRequests
);

export default router;
