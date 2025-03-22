import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { registerUser, loginUser } from '../controllers/authControllers';

const router = Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));

export default router;
