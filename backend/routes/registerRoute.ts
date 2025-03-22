import express from "express";
import User from "../Model/userModel";
import addUser from "../Model/Tools/addUser";
import bcrypt from "bcrypt";

export const register = express.Router();

register.post("/", async (req, res) => {
  try {
    const {  username, email, password } = req.body;
    const existingUsername = await User.findOne({ username:username });    
    const existingEmail = await User.findOne({ email: email });
    if (existingUsername) {
      res.status(400).send("Usernames already exists");
      return;
    }
    if (existingEmail) {
      res.status(400).send("Email already exists");
      return;
    }
    const salt: any = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const result = await addUser(user);
    if (!result.success) {
      res.status(400).send(result.error);
      return;
    }

    res.status(201).send("User registered successfully");
  } catch (error: any) {
    res.status(500).send(error.message || "Internal Server Error");
  }
});

export default register;
