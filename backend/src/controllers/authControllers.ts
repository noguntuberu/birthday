import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { validateUser }from '../utils/sample';

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
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as { _id: string; password: string };

    if (!user) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.setHeader('Authorization', `Bearer ${token}`);
    res.setHeader('User-Id', user._id);

    res.status(200).json({ 
      message: "Login successful",
      token, 
      userId: user._id
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
