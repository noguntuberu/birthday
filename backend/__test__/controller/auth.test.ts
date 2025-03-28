import request from "supertest";
import app from "../../src/app";
import { addUser } from "../../src/services/user";
import { acceptFriendRequest, rejectFriendRequest, removeFriend, sendFriendRequest } from "../../src/services/friend";


jest.mock("../../src/services/user",()=>({
  addUser: jest.fn(),
}));

jest.mock("../../src/services/friend",()=>({
  acceptFriendRequest: jest.fn(),
  rejectFriendRequest: jest.fn(),
  sendFriendRequest: jest.fn(),
  removeFriend: jest.fn(),
}));

jest.mock("../../src/middleware/auth",()=>({
  authMiddleware: jest.fn((req, _res, next) => {
    (req as any).user = { userId: "mockUserId" };
    next();
  }),
}))

const validData: any = {
  username: "johndoe",
  email: "johndoe@example.com",
  password: "password123",
};




describe("User Registration API", () => {
  beforeEach(()=>{
    jest.restoreAllMocks();
  })
  it("should register a user successfully", async () => {
    (addUser as jest.Mock).mockResolvedValue({ success: true });

    const response = await request(app).post("/api/register").send(validData);

    expect(response.status).toBe(201);
    expect(response.text).toBe("User registered successfully");
  });

  it("should return 400 if username already exists", async () => {
    (addUser as jest.Mock).mockResolvedValue({
      success: false,
      error: "Username already exists"});

    const response = await request(app).post("/api/register").send(validData);

    expect(response.status).toBe(400);
    expect(response.text).toEqual( "Username already exists");
  });

  it("should return 500 for unexpected errors", async () => {
    // Mock addUser to throw an error
    (addUser as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/api/register").send(validData);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Database error");
  });
});

describe("POST /accept-friend-request", () => {
  beforeEach(()=>{
    jest.restoreAllMocks();
  })
  it("should accept the friend request successfully", async () => {
    (acceptFriendRequest as jest.Mock).mockResolvedValue({success: true});
    const response = await request(app)
      .post("/api/friendRequest/accept")
      .send({ friendId: "123456" });
    
    expect(response.status).toBe(201);
    expect(response.text).toBe("request successfully accepted");
  });

  it("should return 400 if request could not be accepted", async () => {
    (acceptFriendRequest as jest.Mock).mockResolvedValue({success: false,error: "User not found"});
    const response = await request(app)
      .post("/api/friendRequest/accept")
      .send({ friendId: "invalidId" });

    expect(response.status).toBe(400);
    expect(response.text).toMatch(/User not found/i)
  });

  it("should return 500 on server error", async () => {
    (acceptFriendRequest as jest.Mock).mockRejectedValue(new Error("server error"));
    
    const response = await request(app)
      .post("/api/friendRequest/accept")
      .send({ friendId: "123456" });

    expect(response.status).toBe(500);
    expect(response.text).toBe("server error");
  });
});

describe('reject friend request', () => {
  beforeEach(()=>{
    jest.restoreAllMocks();
  })
  it('should reject a friend request successfully', async () => {
    (rejectFriendRequest as jest.Mock).mockResolvedValue({success: true});
    const res = await request(app).post("/api/friendRequest/reject").send({friendId: "123456"});
    expect(res.status).toBe(201);
    expect(res.text).toBe("request successfully rejected");
  });
  it('should send a status of 400 if friendId not found', async () => {
    (rejectFriendRequest as jest.Mock).mockResolvedValue({success: false, error: "User not found"});
    const res = await request(app).post("/api/friendRequest/reject").send({friendId: "123456"});
    expect(res.status).toBe(400);
    expect(res.text).toBe("User not found");
  });
  it('should send a status of 500 for server error', async () => {
    (rejectFriendRequest as jest.Mock).mockRejectedValue(new Error("server error"));
    const res = await request(app).post("/api/friendRequest/reject").send({friendId: "123456"});
    expect(res.status).toBe(500);
    expect(res.text).toBe("server error");
  });
});

describe('send friend request', () => {
  beforeEach(()=>{
    jest.restoreAllMocks();
  })
  it('should send a friend request successfully', async () => {
    (sendFriendRequest as jest.Mock).mockResolvedValue({success: true});
    const res = await request(app).post("/api/friendRequest/send").send({friendId: "123456"});
    expect(res.status).toBe(201);
    expect(res.text).toBe("request successfully sent");
  });
  it('should send a status of 400 if friendId not found', async () => {
    (sendFriendRequest as jest.Mock).mockResolvedValue({success: false, error: "User not found"});
    const res = await request(app).post("/api/friendRequest/send").send({friendId: "123456"});
    expect(res.status).toBe(400);
    expect(res.text).toBe("User not found");
  });
  it('should send a status of 500 for server error', async () => {
    (sendFriendRequest as jest.Mock).mockRejectedValue(new Error("server error"));
    const res = await request(app).post("/api/friendRequest/send").send({friendId: "123456"});
    expect(res.status).toBe(500);
    expect(res.text).toBe("server error");
  });
});
describe('remove friend', () => {
  beforeEach(()=>{
    jest.restoreAllMocks();
  })
  it('should remove a friend successfully', async () => {
    (removeFriend as jest.Mock).mockResolvedValue({success: true});
    const res = await request(app).post("/api/friend/remove").send({friendId: "123456"});
    expect(res.status).toBe(201);
    expect(res.text).toBe("friend successfully removed");
  });
  it('should send a status of 400 if friendId not found', async () => {
    (removeFriend as jest.Mock).mockResolvedValue({success: false, error: "User not found"});
    const res = await request(app).post("/api/friend/remove").send({friendId: "123456"});
    expect(res.status).toBe(400);
    expect(res.text).toBe("User not found");
  });
  it('should send a status of 500 for server error', async () => {
    (removeFriend as jest.Mock).mockRejectedValue(new Error("server error"));
    const res = await request(app).post("/api/friendRequest/send").send({friendId: "123456"});
    expect(res.status).toBe(500);
    expect(res.text).toBe("server error");
  });
});