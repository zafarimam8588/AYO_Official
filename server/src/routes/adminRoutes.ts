// routes/adminRoutes.ts
import { Router } from "express";
import {
  getAllMembers,
  approveMember,
  rejectMember,
  getDashboardStats,
  getPendingDeletionRequests,
  getAllUsers,
  DeleteUser,
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

// ⚠️ In the next update: don’t delete users, just deactivate them
router.post("/users/:userId/delete-user", isLoggedIn, isAdmin, DeleteUser);

router.get(
  "/deletion-requests/:requestId",
  isLoggedIn,
  isAdmin,
  getPendingDeletionRequests
);

export default router;
