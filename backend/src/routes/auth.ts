import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { registerUser, loginUser, controlSendFriendRequest, controlAcceptFriendRequest, controlRejectFriendRequest, controlRemoveFriend } from '../controllers/auth';
import { authMiddleware } from '../middleware/auth';


const router = Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.post('/friendRequest/accept', authMiddleware, controlAcceptFriendRequest);
router.post("/friendRequest/send", authMiddleware, asyncHandler(controlSendFriendRequest));
router.post("/friendRequest/accept", authMiddleware, asyncHandler(controlAcceptFriendRequest));
router.post("/friendRequest/reject", authMiddleware, asyncHandler(controlRejectFriendRequest));
router.delete("/friends/:friendId", authMiddleware, asyncHandler(controlRemoveFriend));

export default router;
