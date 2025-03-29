import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllFriendRequests, getAllFriends } from "../controllers/friends";
const router = express.Router();

router.get("/", authMiddleware, getAllFriends);
router.get("/requests", authMiddleware, getAllFriendRequests);

export default router;
