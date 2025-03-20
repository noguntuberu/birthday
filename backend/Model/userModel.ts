import mongoose, { Schema, Document } from "mongoose";
import connectDB from "./Tools/dbConnect";

connectDB();

// Define TypeScript Interface for User Document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  email: string;
  password: string;
  dob: Date;
  gender: "male" | "female";
  friends: mongoose.Types.ObjectId[];
  friendRequests: {
    userId: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "declined";
  }[];
  notifications: {
    message: string;
    isRead: boolean;
    createdAt: Date;
  }[];
  lastLogin?: Date;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, minlength: 9 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  dob: { type: Date, required: true },
  gender: { type: String, trim: true, enum: ["male", "female"] },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
    },
  ],
  notifications: [
    {
      message: { type: String, required: true },
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;