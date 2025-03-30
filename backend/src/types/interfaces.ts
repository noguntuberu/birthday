import mongoose, { Document } from "mongoose";

export interface IResult {
  success: boolean;
  error?: string;
  userId?: string; // ✅ Allow userId in the response
}


export interface DBUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  email: string;
  password: string;
  profilePic:string;
  dob: Date;
  gender: "male" | "female";
  hobbies: string;
  location: string;
  friends: mongoose.Types.ObjectId[];
  sentRequests: {
    userId: mongoose.Types.ObjectId;
  }[];
  friendRequests: {
    userId: mongoose.Types.ObjectId;
  }[];
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
  _id: string;
  email: string;
  username: string;
  password: string;
  [key: string]: any; // Allows additional unknown properties
}
