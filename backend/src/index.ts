import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db/dbConnect";
import cron from "node-cron";
import birthdayNotifications from "./services/birthdayNot";

dotenv.config();


const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
		await connectDB();

		cron.schedule("0 0 * * *", async()=>{
			console.log("its working");
			await birthdayNotifications();
		});

    app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1); 
  }
};

startServer();
