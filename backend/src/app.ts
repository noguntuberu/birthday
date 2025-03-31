import express from "express";
import cors from "cors";
import router from "./routes/auth";
import users from "./routes/users";
import friends from "./routes/friends";
import images from "./routes/image";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api/users", users);
app.use("/api/friends", friends);
app.use("/api/images", images);


app.get("/", (_req, res) => {
  res.send("<h1>Server is running...</h1>");
});


export default app;
