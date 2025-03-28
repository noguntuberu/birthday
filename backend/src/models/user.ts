import mongoose, { Schema } from "mongoose";
import { DBUser } from "../types/interfaces";


// Define TypeScript Interface for User Document


const userSchema = new Schema<DBUser>({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phone: { type: String, minlength: 9 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  dob: { type: Date },
  gender: { type: String, trim: true, enum: ["male", "female"] },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notifications: [
    {
      id: {type: Number},
      message: { type: String, required: true },
      type: {type: String, trim: true, enum: ["birthday","AcceptedRequest","ReceivedRequest"]},
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      relatedUser: {type: String}
    },
  ],
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<DBUser>("User", userSchema);

export default User;

