import { Profile, IProfile } from '../models/Profile';

export class ProfileService {
  static async getProfile(userId: string): Promise<IProfile | null> {
    return Profile.findOne({ userId });
  }

  static async createOrUpdateProfile(
    userId: string, 
    profileData: Partial<IProfile>
  ): Promise<IProfile> {
    return Profile.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { new: true, upsert: true }
    );
  }

  static async uploadProfileImage(
    userId: string, 
    imageUrl: string
  ): Promise<IProfile | null> {
    return Profile.findOneAndUpdate(
      { userId },
      { $set: { imageUrl } },
      { new: true }
    );
  }
}