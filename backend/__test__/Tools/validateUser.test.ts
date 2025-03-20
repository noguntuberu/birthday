import validateUser from "../../Model/Tools/validateUser";
import { IUser } from "../../Model/Tools/validateUser";

describe("User Validation", () => {
  it("should validate a correct user object", async () => {
    const validUser:IUser = {
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      email: "john.doe@example.com",
      dob: new Date("1990-01-01"),
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
      lastName: "Doe",
      email: "invalid-email",
      dob: "3000-12-12", 
      username: "johndoe",
    };

    const { error } = await validateUser(invalidUser);
    
    expect(error).toBeDefined();
    expect(error?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: expect.stringContaining("firstName") }),
        expect.objectContaining({ message: expect.stringContaining("email") }),
        expect.objectContaining({ message: expect.stringContaining("dob") }),
        expect.objectContaining({ message: expect.stringContaining("password") }),
      ])
    );
  });

  it("should return an error if inputs are too short, invalid gender", () => {
    const invalidUser:any = {
      firstName: "Je", // name too short
      lastName: "Doe",
      gender: "Other", // invalid gender
      email: "jane.doe@example.com",
      dob: new Date("1995-05-15"),
      username: "janedoe",
      password: "123", // Too short
    };

    const { error } = validateUser(invalidUser);
    expect(error).toBeDefined();
    expect(error?.details).toEqual(expect.arrayContaining([
      expect.objectContaining({message: expect.stringContaining("firstName")}),
      expect.objectContaining({message: expect.stringContaining("gender")}),
      expect.objectContaining({message: expect.stringContaining("password")}),
    ]))
  });
});