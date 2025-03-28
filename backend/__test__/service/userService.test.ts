import {addUser} from "../../src/services/user";
import {validateUser} from "../../src/utils/sample";
import { IUser } from "../../src/types/interfaces";
import User from "../../src/models/user";
// import mongoose from "mongoose";
import connectDB from "../../src/db/dbConnect";


jest.mock("../../src/utils/sample",()=>({
  validateUser: jest.fn(),
}));

jest.setTimeout(10000);
describe('addUser', () => {
  const userDetails: IUser = {
    email: "john@example.com",
    username: "johndoe",
    password: "securepassword",
    save: jest.fn().mockResolvedValue(true),
  };
  beforeAll(async () => {
    // jest.spyOn(mongoose, "connect").mockImplementation(jest.fn()); // Prevent real DB connection
   await connectDB();
  });
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  afterEach(()=>{
    jest.clearAllMocks();
  });
  it('should return success if user is valid and saved ', async() => {
    (validateUser as jest.Mock).mockResolvedValue({error: null});
    User.findOne = jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    User.prototype.save = jest.fn().mockResolvedValue(true);
    const result = await addUser(userDetails);
    
    
    expect(result).toEqual({ success: true });
    expect(User.prototype.save).toHaveBeenCalled();
  });

  it('should return error if validation fails', async() => {
    (validateUser as jest.Mock).mockReturnValue({error: {details: [{message: "invalid Email format"},{message: "username must be at least 3 characters long"}]}});
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue(true);
    const result = await addUser(userDetails);
    expect(result).toEqual(expect.objectContaining({success: false, error : expect.stringMatching(/email.*username|username.*email/i)}));
    expect(User.prototype.save).not.toHaveBeenCalled();
  });

  it('should return an error if user.save() returns an error', async () => {
    (validateUser as jest.Mock).mockReturnValue({error: null});
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockRejectedValue(new Error("Database Error"));
    const result = await addUser(userDetails);
    expect(result).toEqual({success: false, error: "Database Error"});
    expect(User.prototype.save).toHaveBeenCalled();    
  });

  it('should return false success if username exists', async () => {
    (validateUser as jest.Mock).mockReturnValue({error:null});
    User.findOne = jest.fn().mockResolvedValue({username: "johndoe"});
    const result = await addUser(userDetails);
    expect(result).toEqual({success: false, error: "Username already exists"});
    expect(userDetails.save).not.toHaveBeenCalled(); 
  });

  it('should return false success if email exists', async () => {
    (validateUser as jest.Mock).mockReturnValue({error:null});
    User.findOne = jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({username: "johndoe"});
    const result = await addUser(userDetails);
    expect(result).toEqual({success: false, error: "Email already exists"});
    expect(userDetails.save).not.toHaveBeenCalled(); 
  });
});