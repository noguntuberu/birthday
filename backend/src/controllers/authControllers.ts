import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Model/userModel';
import validateUser from '../Model/Tools/validateUser';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).json({ error: error.details.map((d) => d.message) });
      return;
    }

    const { firstName, lastName, username, dob, email, password, gender } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(400).json({ error: 'Username or Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      dob,
      email,
      password: hashedPassword,
      gender: gender.toLowerCase()
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};



export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
