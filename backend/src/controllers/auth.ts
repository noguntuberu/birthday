import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { addUser } from '../services/user';
import dotenv from "dotenv";
import { sendFriendRequest, acceptFriendRequest, viewFriendRequests, rejectFriendRequest, removeFriend } from '../services/friend';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "Go-mailer";

export const registerUser = async (req: Request, res: Response): Promise<void>=> {
  try {
    const result = await addUser(req.body);
    if (!result.success) {
      res.status(400).send(result.error);
      return;
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(500).json({ error: "User registration failed" });
      return;
    }

    const userId = user._id instanceof mongoose.Types.ObjectId 
      ? user._id.toString() 
      : String(user._id);  

    res.status(201).json({ 
      message: "User registered successfully",
      userId
    });
  } catch (error: any) {
    res.status(500).send(error.message || "Internal Server Error");
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email only
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const userId = user._id instanceof mongoose.Types.ObjectId 
      ? user._id.toString() 
      : String(user._id);

    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });

    // Set Authorization headers
    res.setHeader('Authorization', `Bearer ${token}`);
    res.setHeader('User-Id', userId);

    res.status(200).json({ 
      message: "Login successful",
      token, 
      userId
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const controlSendFriendRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const senderId = (req as any).user.userId;
    const {receiverId} = req.body;
    const result = await sendFriendRequest(senderId, receiverId);
    if(!result.success){
      res.status(400).send(result.error);
      return;
    }
    res.status(201).send("request successfully sent");
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};

export const controlAcceptFriendRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const {friendId} = req.body;
    const result = await acceptFriendRequest(userId, friendId);
    if(!result.success){
      res.status(400).send(result.error);
      return;
    }
    res.status(201).send("request successfully accepted");
    return;
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
    return;
  }
};

export const controlRejectFriendRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const {friendId} = req.body;
    const result = await rejectFriendRequest(userId, friendId);
    if(!result.success){
      res.status(400).send(result.error);
      return;
    }
    res.status(201).send("request successfully rejected");
    return;
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
    return;
  }
};

export const controlViewFriendRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const result = await viewFriendRequests(userId);

    if (!result.success) {
      res.status(400).send(result.error);
      return;
    }

    res.status(200).json({
      message: 'Friend requests retrieved successfully',
      friendRequests: result.friendRequests
    });
  } catch (error: any) {
    res.status(500).send(error.message || "Server error");
  }
};

export const controlRemoveFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const {friendId} = req.body;
    const result = await removeFriend(userId, friendId);
    if(!result.success){
      res.status(400).send(result.error);
      return
    }
    res.status(201).send("friend successfully removed");
    return;
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
    return;
  }
};
