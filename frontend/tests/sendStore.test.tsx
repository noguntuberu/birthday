import axios from "axios";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { sendFriendRequest } from "../src/features/MembersArea/members/sendFriendReq/sendStore";

vi.mock("axios");

const mockPost = vi.mocked(axios.post);

beforeEach(() => {
  localStorage.clear();
});

describe("sendFriendRequest", () => {
  it("should return true when request is successful", async () => {
    localStorage.setItem("token", "validToken");

    mockPost.mockResolvedValue({ data: { success: true } });

    const result = await sendFriendRequest("receiver123");
    expect(result).toBe(true);
    expect(mockPost).toHaveBeenCalledWith(
      "http://localhost:3000/api/friendRequest/send",
      { receiverId: "receiver123" },
      {
        headers: {
          Authorization: "validToken",
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("should throw an error if token is missing", async () => {
    localStorage.removeItem("token");

    const result = await sendFriendRequest("receiver123");
    expect(result).toBe(false);
  });

  it("should return false if receiverId is missing", async () => {
    localStorage.setItem("token", "validToken");

    const result = await sendFriendRequest("");
    expect(result).toBe(false);
  });

  it("should return false if API request fails", async () => {
    localStorage.setItem("token", "validToken");

    mockPost.mockRejectedValue(new Error("Request failed"));

    const result = await sendFriendRequest("receiver123");
    expect(result).toBe(false);
  });
});
