import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updatePassword,
  updateProfile,
} from "../controller/authController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getMe);

router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-profile", authMiddleware, updateProfile);

export default router;
