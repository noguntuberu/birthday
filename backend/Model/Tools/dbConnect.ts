import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect("mongodb://localhost:27017/birthday");
    console.log("Connected to database");
  } catch (err: any) {
    console.log("Database connection error:", err.message);
  }
}

export default connectDB;