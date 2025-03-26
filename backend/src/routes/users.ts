import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllUsers, getUserById } from "../controllers/users";
const router = express.Router();

router.get("/", authMiddleware, getAllUsers);

router.get("/me", authMiddleware, getUserById);

export default router;
