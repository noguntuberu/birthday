import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Remove unused SECRET_KEY declaration
export function authMiddleware(
    req: Request, 
    res: Response, 
    next: NextFunction
): void {  // Change return type to void
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
        res.status(401).json({ error: "No Authorization header" });
        return;
    }

    // Extract the token - IMPORTANT
    const token = authHeader.replace("Bearer ", "").trim();

    // Ensure JWT_SECRET exists
    const secret = process.env.JWT_SECRET || "Go-mailer";
    if (!secret) {
        res.status(500).json({ error: "Server configuration error" });
        return;
    }

    try {
        const verified = jwt.verify(token, secret);
        (req as any).user = verified;
        next();
    } catch (error) {
        res.status(401).json({ 
            error: "Invalid token", 
            details: error instanceof Error ? error.message : "Unknown error" 
        });
    }
}
