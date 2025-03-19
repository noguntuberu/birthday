import request from "supertest";
import app from "../app";

describe("API Tests", () => {
  it("should return a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/server is running/i); // Fix typo
  });
});
