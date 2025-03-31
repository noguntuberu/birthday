import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllFriendRequests, getAllFriends, getAllSentRequests } from "../controllers/friends";
const router = express.Router();

router.get("/", authMiddleware, getAllFriends);
router.get("/requests", authMiddleware, getAllFriendRequests);
router.get("/sentRequests", authMiddleware, getAllSentRequests);

export default router;
