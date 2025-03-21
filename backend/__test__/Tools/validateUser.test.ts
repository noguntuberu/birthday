import validateUser from "../../Model/Tools/validateUser";
import { IUser } from "../../Model/Tools/validateUser";

describe("User Validation", () => {
  it("should validate a correct user object", async () => {
    const validUser:IUser = {
      email: "john.doe@example.com",
      username: "johndoe",
      password: "securepassword123",
    };

    const result = await validateUser(validUser);
    const { error } = result;    
    expect(error).toBeUndefined();
    expect(result.value).toEqual(validUser);
  });

  it("should return an error for missing required fields", async () => {
    const invalidUser:any = {
      email: "invalid-email",
      username: "johndoe",
    };

    const { error } = await validateUser(invalidUser);
    
    expect(error).toBeDefined();
    expect(error?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: expect.stringContaining("email") }),
        expect.objectContaining({ message: expect.stringContaining("password") }),
      ])
    );
  });

  it("should return an error if inputs are too short, invalid gender", () => {
    const invalidUser:any = {
      email: "jane.doe@example.com",
      username: "janedoe",
      password: "123", 
    };

    const { error } = validateUser(invalidUser);
    expect(error).toBeDefined();
    expect(error?.details).toEqual(expect.arrayContaining([
      expect.objectContaining({message: expect.stringContaining("password")}),
    ]))
  });
});