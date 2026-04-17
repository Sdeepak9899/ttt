import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  toggleFavorite,
  toggleArchive,
} from "../controller/noteController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

router.patch("/:id/favorite", toggleFavorite);
router.patch("/:id/archive", toggleArchive);

export default router;
