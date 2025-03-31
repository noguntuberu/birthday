import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SendFriendRequest from "../src/features/MembersArea/members/sendFriendReq";
import { sendFriendRequest } from "../src/features/MembersArea/members/sendFriendReq/sendStore";
import React from "react";

vi.mock("../src/features/MembersArea/members/sendFriendReq/sendStore", () => ({
  sendFriendRequest: vi.fn(),
}));

describe("SendFriendRequest Component", () => {
  const receiverId = "123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call sendFriendRequest when button is clicked", async () => {
    (sendFriendRequest as vi.Mock).mockResolvedValue(true);

    render(<SendFriendRequest receiverId={receiverId} />);

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(sendFriendRequest).toHaveBeenCalledWith(receiverId);
    });

    expect(sendFriendRequest).toHaveBeenCalledTimes(1);
  });

  it("should log out 'error' when sendFriendRequest fails", async () => {
    (sendFriendRequest as vi.Mock).mockResolvedValue(false);

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<SendFriendRequest receiverId={receiverId} />);
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("error");
    });

    consoleSpy.mockRestore();
  });
});
