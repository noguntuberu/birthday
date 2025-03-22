import mongoose from "mongoose";
import connectDB from "../../Model/Tools/dbConnect";

jest.mock("mongoose", ()=>({
  connect: jest.fn(),
}));

describe('group', () => {
  it('should connect to the database if no error', async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    (mongoose.connect as jest.Mock).mockResolvedValue(null);
    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith("Connected to database");
    consoleSpy.mockRestore();
  })

  it('should not connect in error', async () => {
    const consoleErrSpy = jest.spyOn(console, "log").mockImplementation();
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error("Database connection error"));
    await connectDB();

    expect(consoleErrSpy).toHaveBeenCalledWith("Database connection error:", "Database connection error");
    consoleErrSpy.mockRestore();
  })
})

