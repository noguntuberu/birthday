import { Request, Response } from "express";
import UserService from "../services/getUsers";

export const getAllUsers = async (_: Request, res: Response) => {
	const users = await UserService.findAllUsers();
	res.send(users);
	return;
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user._id;
		const user = await UserService.findUsersById(userId);
		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		res.send(user);
	} catch (err: any) {
		res.status(500).send(`Server error: ${err.message}`);
	}
};
