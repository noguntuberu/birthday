import { Request, Response } from 'express';
import { ProfileService } from '../services/profile';
import { IProfile } from '../models/Profile';

export class Profile {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const profile = await ProfileService.getProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      // Transform data for frontend
      const profileData = {
        username: profile.username,
        bio: profile.bio,
        dob: profile.dob?.toISOString().split('T')[0],
        hobbies: profile.hobbies?.join(', '),
        location: profile.location,
        email: profile.email,
        posts: profile.posts,
        followers: profile.followers,
        following: profile.following,
        friends: profile.friends,
        image: profile.imageUrl
      };

      return res.json(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { 
        username, 
        bio, 
        dob, 
        hobbies, 
        location, 
        email 
      } = req.body as { 
        username?: string; 
        bio?: string; 
        dob?: string; 
        hobbies?: string; 
        location?: string; 
        email?: string; 
      };

      // Transform hobbies from string to array
      const hobbiesArray = hobbies ? hobbies.split(',').map((h) => h.trim()) : undefined;

      const updatedProfile = await ProfileService.createOrUpdateProfile(userId, {
        username,
        bio,
        dob: dob ? new Date(dob) : undefined,
        hobbies: hobbiesArray,
        location,
        email
      });

      res.json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async uploadProfileImage(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Assuming you're using something like multer or cloudinary
      // and the image URL is available in req.file or similar
      const imageUrl = req.file?.path;
      if (!imageUrl) {
        return res.status(400).json({ message: 'No image provided' });
      }

      const updatedProfile = await ProfileService.uploadProfileImage(userId, imageUrl);
      res.json(updatedProfile);
    } catch (error) {
      console.error('Error uploading profile image:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}