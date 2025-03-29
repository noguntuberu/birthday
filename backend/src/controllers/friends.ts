import { Request, Response } from "express";
import FriendService from "../services/getFriends";

export const getAllFriends = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.userId;
		const friends = await FriendService.findAllFriends(userId);
		if (!friends) {
			res.status(404).send("friends could not be found");
			return;
		}
		res.send(friends);
	} catch (err: any) {
		res.status(500).send(`Server error: ${err.message}`);
	}
};

export const getAllFriendRequests = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.userId;
		const friendRequests = await FriendService.findAllFriendRequests(userId);
		if (!friendRequests) {
			res.status(404).send("friend Requests could not be found");
			return;
		}
		res.send(friendRequests);
	} catch (err: any) {
		res.status(500).send(`Server error: ${err.message}`);
	}
};
