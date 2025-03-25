import mongoose from "mongoose";

async function connectDB(): Promise<void> {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/birthday");
		console.log("Connected to database");
	} catch (err: any) {
		console.log("Database connection error:", err.message);
	}
}

export default connectDB;
