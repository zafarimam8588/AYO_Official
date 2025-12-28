// routes/memberRoutes.ts
import { Router } from "express";

import {
  getMemberData,
  submitMemberRequest,
  updateMemberProfile,
} from "../controllers/memberController";
import { isLoggedIn } from "../middleware/authMiddleware";

const router = Router();

// Get member profile data
router.get("/profile", isLoggedIn, getMemberData);

// Update member profile data
router.put("/profile", isLoggedIn, updateMemberProfile);

// Submit member request
router.post("/submit-memberRequest", isLoggedIn, submitMemberRequest);

export default router;
