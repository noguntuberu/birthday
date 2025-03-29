import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  registerUser,
  loginUser,
  controlSendFriendRequest,
  controlAcceptFriendRequest,
  controlRejectFriendRequest, controlViewFriendRequests,
  controlRemoveFriend,
} from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";
import {
  controlDeleteAllNotifications,
  controlDeleteNotificationById,
  controlGetAllNotifications,
  controlGetNotificationById,
  controlReadAllNotifications,
  controlReadNotification,
  controlSendNotification,
} from "../controllers/notifications";
import { getOtherUserProfile } from "../controllers/users";

const router = Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.post("/friendRequest/send", authMiddleware, asyncHandler(controlSendFriendRequest));
router.post("/friendRequest/accept", authMiddleware, asyncHandler(controlAcceptFriendRequest));
router.post("/friendRequest/reject", authMiddleware, asyncHandler(controlRejectFriendRequest));
router.delete("/friend/:id", authMiddleware, asyncHandler(controlRemoveFriend));
router.get("/notifications", authMiddleware, asyncHandler(controlGetAllNotifications));
router.get("/notifications/:id", authMiddleware, asyncHandler(controlGetNotificationById));
router.delete("/notifications", authMiddleware, asyncHandler(controlDeleteAllNotifications));
router.delete("/notifications/:id", authMiddleware, asyncHandler(controlDeleteNotificationById));
router.patch("/notifications", authMiddleware, asyncHandler(controlReadAllNotifications));
router.patch("/notifications/:id", authMiddleware, asyncHandler(controlReadNotification));
router.post("/notifications/:id", authMiddleware, asyncHandler(controlSendNotification));
router.get("/otherUsers/:id", authMiddleware, asyncHandler(getOtherUserProfile));
router.get('/friendRequest/view', authMiddleware, asyncHandler(controlViewFriendRequests));
router.post("/friendRequest/remove", authMiddleware, asyncHandler(controlRemoveFriend));

export default router;
