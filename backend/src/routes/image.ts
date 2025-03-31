import multer from "multer";
import express from "express";
import asyncHandler from "express-async-handler";
import { controlAddImage, controlGetImage, controlGetOthersImage } from "../controllers/image";
import { authMiddleware } from "../middleware/auth";


const storage = multer.memoryStorage();
const upload = multer({storage});
const router = express.Router();

router.post('/',authMiddleware, upload.single("image"), asyncHandler(controlAddImage));
router.get('/', authMiddleware, asyncHandler(controlGetImage));
router.get("/:id", authMiddleware, asyncHandler(controlGetOthersImage));

export default router;

