import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = verified; // Explicitly assign `user` to `req`
    return next(); // Ensure next() is returned
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
