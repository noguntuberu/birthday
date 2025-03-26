import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "Go-mailer";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.header("Authorization");

	if (!token) {
		res.status(401).json({ error: "Access denied" });
		return;
	}

	try {
		const verified = jwt.verify(token, SECRET_KEY as string);
		(req as any).user = verified;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
		return;
	}
}
