import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import UserProfile from "../src/features/MembersArea/members/profile/profile";
import React from "react";
import "@testing-library/jest-dom/vitest";
import "whatwg-fetch";
import { MemoryRouter } from "react-router-dom";

describe("UserProfile Component", () => {
  it("renders Friend Requests section", async () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(screen.getByText(/friend requests/i)).toBeInTheDocument();
  });

  it("renders Connected Friends section", async () => {
    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(screen.getByText(/connected friends/i)).toBeInTheDocument();
  });

  it("fetches and displays friend requests", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => [{ id: "1", name: "John Doe", username: "johndoe" }],
    });

    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  });

  it("fetches and displays friends", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => [],
      })
      .mockResolvedValueOnce({
        json: async () => [
          { id: "2", name: "Jane Smith", username: "janesmith" },
        ],
      });

    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
  });

  it("selecting a friend displays their details", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => [],
      })
      .mockResolvedValueOnce({
        json: async () => [
          { id: "3", name: "Alice Brown", username: "alicebrown" },
        ],
      });

    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    const friendItem = await screen.findByText(/Alice Brown/i);
    fireEvent.click(friendItem);

    expect(screen.getByText(/username: alicebrown/i)).toBeInTheDocument();
  });

  it("clicking close button hides selected friend details", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => [],
      })
      .mockResolvedValueOnce({
        json: async () => [
          { id: "4", name: "Bob Martin", username: "bobmartin" },
        ],
      });

    render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    const friendItem = await screen.findByText(/Bob Martin/i);
    fireEvent.click(friendItem);

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText(/username: bobmartin/i)).not.toBeInTheDocument();
  });
});
