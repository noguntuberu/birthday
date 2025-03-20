import validateUser from "./validateUser";
import { IUser } from "./validateUser"; 

interface IResult {
  success: boolean;
  error?: string;
}

async function addUser(user: IUser): Promise<IResult> {
  try {
    const result = await validateUser(user);

    if (result.error) {
      const errorMessages =result.error.details.map(error=> error.message);
      throw new Error(errorMessages.join(", "))
    }

    await user.save();
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };;
  }
}

export default addUser;
