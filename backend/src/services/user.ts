import { validateUser } from "../utils/sample";
import { IResult, IUser } from "../types/interfaces";
import User from "../models/user";
import bcrypt from "bcryptjs";

export async function addUser(data: IUser): Promise<IResult> {
  try {
    const result = await validateUser(data);
    if (result.error) {
      const errorMessages = result.error.details.map((error) => error.message);
      throw new Error(errorMessages.join(", "));
    }
    const { username, email, password } = data;
    const existingUsername = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });
    if (existingUsername) {
      return { success: false, error: "Username already exists" };
    }
    if (existingEmail) {
      return { success: false, error: "Email already exists" };
    }
    const salt: any = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: any = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export const updateUser = async (data: any, userId: string) => {
  try {
    const { firstName, lastName, gender, dob, hobbies, location } = data;
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Update only if the field is provided
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (gender !== undefined) user.gender = gender;
    if (dob !== undefined) user.dob = dob;
    if (hobbies !== undefined) user.hobbies = hobbies;
    if (location !== undefined) user.location = location;

    await user.save();
    return { success: true, message: "User updated successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

