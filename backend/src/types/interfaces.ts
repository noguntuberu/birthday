import mongoose, { Document } from "mongoose";

export interface IResult {
  success: boolean;
  error?: string;
}

export interface DBUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  email: string;
  password: string;
  dob: Date;
  gender: "male" | "female";
  friends: mongoose.Types.ObjectId[];
  friendRequests: mongoose.Types.ObjectId[];
  notifications: {
    id: number;
    message: string;
    type: "birthday"|"AcceptedRequest"|"ReceivedRequest";
    isRead: boolean;
    createdAt: Date;
    relatedUser:string;
  }[];
  lastLogin?: Date;
  createdAt: Date;
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  [key: string]: any; // Allows additional unknown properties
}
