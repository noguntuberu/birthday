import request from "supertest";
import app from "../src/app";

describe("API Tests", () => {
  it("should return a running message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/server is running/i); 
  });
});
