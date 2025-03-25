import express from "express";
import User from "../models/user";
import { authMiddleware } from "../middleware/auth";
const router = express.Router();

router.get("/", authMiddleware, async (_, res) => {
	const users = await User.find()
		.populate("friends")
		.populate("friendRequests")
		.select("-password -notifications -createdAt -__v")
		.sort("username");
	res.send(users);
	return;
});

router.get("/:id", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate("friends")
			.populate("friendRequests")
			.select("-password -notifications -createdAt -__v");
		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		res.send(user);
	} catch (err: any) {
		res.status(500).send(`Server error: ${err.message}`);
	}
});

export default router;
