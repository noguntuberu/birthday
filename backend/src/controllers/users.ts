import { Request, Response } from "express";
import UserService from "../services/getUsers";

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await UserService.findAllUsers();
  res.send(users);
  return;
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
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

export const getOtherUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const requestingUserId: string = (req as any).user.userId;

    const requestingUser = await UserService.findUsersById(requestingUserId);
    if (!requestingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const isFriend: boolean = requestingUser?.friends.some(
      (friend) => friend.toString() === userId
    );

    const user = await UserService.findUserProfileById(userId, isFriend);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).send(`Server error: ${err.message}`);
  }
};
