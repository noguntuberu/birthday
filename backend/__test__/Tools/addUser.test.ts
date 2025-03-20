import addUser from "../../Model/Tools/addUser";
import validateUser, { IUser } from "../../Model/Tools/validateUser";


jest.mock("../../Model/Tools/validateUser");

describe('addUser', () => {
  const userDetails: IUser = {
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    email: "john@example.com",
    dob: new Date("2000-01-01"),
    username: "johndoe",
    password: "securepassword",
    save: jest.fn().mockResolvedValue(true),
  };

  afterEach(()=>{
    jest.clearAllMocks();
  })
  it('should return success if user is valid and saved ', async() => {
    (validateUser as jest.Mock).mockReturnValue({error: null});
    const result = await addUser(userDetails);
    expect(result).toEqual({success: true});
    expect(userDetails.save).toHaveBeenCalled();
  });

  it('should return error if validation fails', async() => {
    (validateUser as jest.Mock).mockReturnValue({error: {details: [{message: "invalid Email format"},{message: "firstName must be at least 3 characters long"}]}});
    const result = await addUser(userDetails)
    expect(result).toEqual(expect.objectContaining({success: false, error : expect.stringMatching(/email.*firstName|firstName.*email/i)}));
    expect(userDetails.save).not.toHaveBeenCalled();
  });

  it('should return an error if user.save() returns an error', async () => {
    (validateUser as jest.Mock).mockReturnValue({error: null});
    userDetails.save = jest.fn().mockRejectedValue(new Error("Database Error"))
    const result = await addUser(userDetails);
    expect(result).toEqual({success: false, error: "Database Error"});
    expect(userDetails.save).toHaveBeenCalled();    
  })
});