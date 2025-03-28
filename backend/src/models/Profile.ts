import { Document } from 'mongoose';

export interface IProfile extends Document {
  userId: string;
  username: string;
  bio?: string;
  dob?: Date;
  hobbies?: string[];
  location?: string;
  email: string;
  posts?: number;
  followers?: number;
  following?: number;
  friends?: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// If using Mongoose
import { Schema, model } from 'mongoose';

const profileSchema = new Schema<IProfile>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  bio: { type: String },
  dob: { type: Date },
  hobbies: { type: [String] },
  location: { type: String },
  email: { type: String, required: true },
  posts: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  friends: { type: [String] },
  imageUrl: { type: String },
}, {
  timestamps: true
});

export const Profile = model<IProfile>('Profile', profileSchema);