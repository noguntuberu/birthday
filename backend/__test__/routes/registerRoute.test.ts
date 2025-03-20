import request from "supertest";
import app from "../../src/app";
import addUser from "../../Model/Tools/addUser";
import User from "../../Model/userModel";

jest.mock("../../Model/Tools/addUser");

const validData: any = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  password: "password123",
  gender: "male",
};
describe("User Registration", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(async() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    
  });

  afterAll(() => {
    jest.restoreAllMocks(); 
  });
  
  it("should successfully register a user given valid data", async () => {
    User.findOne= jest.fn().mockResolvedValueOnce(null);
    (addUser as jest.Mock).mockResolvedValueOnce({ success: true });
    const res = await request(app)
      .post("/register")
      .send(validData)
      .set("Accept", "application/json");

    expect(res.status).toBe(201);
    expect(res.text).toEqual("User registered successfully"); 
  });
  it('should return error if username already exists', async() => {
    User.findOne = jest.fn().mockResolvedValueOnce({username:"johndoe"});
    (addUser as jest.Mock).mockResolvedValueOnce({ success: true});
    const res = await request(app).post("/register").send(validData);
    expect(res.status).toBe(400);
    expect(res.text).toMatch(/username/i);
  });
  it('should return an error if email already exists', async()=>{
    User.findOne = jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ email: "johndoe@example.com"});
    
    (addUser as jest.Mock).mockResolvedValueOnce({success: true});  
    const res= await request(app).post("/register").send(validData);
    expect(res.status).toBe(400);
    expect(res.text).toMatch(/email/i);
  });
  it('should return error if it fails to add user', async () => {
    User.findOne = jest.fn().mockResolvedValueOnce(null);
    (addUser as jest.Mock).mockResolvedValueOnce({success: false, error: "unable to save"});
    const res = await request(app).post("/register").send(validData);
    expect(res.status).toBe(400);
    expect(res.text).toMatch(/unable/i)
  })
  it('should return a', async ()=>{
    User.findOne = jest.fn().mockRejectedValue(new Error("unexpected error"));
    
    const res =await request(app).post('/register').send(validData);

    expect(res.status).toBe(500);
    expect(res.text).toMatch(/unexpected/i);

  })
});
