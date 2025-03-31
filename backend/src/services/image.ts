import Image from "../models/image";
import User from "../models/user";

class ImageService {
  async addImage(image: string, user: string) {
    try {
      const existingUser = await Image.findOne({ user: user });
      const checkUser = await User.findById(user);
      if (!checkUser) {
        return { success: false, error: "user not found" };
      }
      if (existingUser) {
        existingUser.image = image;
        await existingUser.save();
        return {success: true}
      }
      const newImage = new Image({
        image,
        user,
      });

      await newImage.save();
      return {success: true}
    } catch (err:any) {
      return {success: false, error: err.message}
    }
  }

  async getImage(user: string) {
    try {
      const existingUser = await Image.findOne({ user: user });
      if(!existingUser) return;
      
      return existingUser.image;
    } catch (err) {
      return;
    }
  }
}

export default new ImageService();
