import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: { userId: string };
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const validateProfileOwnership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await Profile.findOne({ userId: req.user?.userId });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if the authenticated user owns this profile
    if (profile.userId !== req.user?.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this profile' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};