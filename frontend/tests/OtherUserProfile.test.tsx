import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import OtherUserProfile from "../src/features/MembersArea/members/profile/OtherUserProfile";
import React from "react";

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: "1",
          name: "John Doe",
          username: "@johndoe",
          profilePic: "/path/to/profile.jpg",
        }),
    }),
  ),
);

describe("OtherUserProfile Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state initially", () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:userId" element={<OtherUserProfile />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Loading profile.../i)).toBeInTheDocument();
  });

  it("fetches and displays user data", async () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:userId" element={<OtherUserProfile />} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for user data to appear
    await waitFor(() => screen.getByText("John Doe"));

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    await screen.findByText(/@johndoe/i);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/path/to/profile.jpg",
    );
  });

  it("handles API errors gracefully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("API Error"))),
    );

    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:userId" element={<OtherUserProfile />} />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => screen.getByText("Loading profile..."));

    expect(screen.getByText("Loading profile...")).toBeInTheDocument();
  });
});
