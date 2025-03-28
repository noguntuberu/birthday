import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllFriends } from "../controllers/friends";
const router = express.Router();

router.get("/", authMiddleware, getAllFriends);

export default router;
