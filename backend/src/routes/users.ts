import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllUsers, getUserById, controlUpdateUser } from "../controllers/users";
const router = express.Router();

router.get("/", authMiddleware, getAllUsers);

router.get("/me", authMiddleware, getUserById);
router.patch("/", authMiddleware, controlUpdateUser);

export default router;
