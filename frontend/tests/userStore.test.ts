import axios from "axios";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useUserStore } from "../src/features/MembersArea/members/search/userStore";
import { faker } from "@faker-js/faker";

vi.mock("axios");

type MockUser = {
  _id: string;
  username: string;
  email: string;
  friends: string[];
  friendRequests: string[];
};

const generateMockUser = (): MockUser => ({
  _id: faker.string.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  friends: [faker.string.uuid(), faker.string.uuid()],
  friendRequests: [faker.string.uuid()],
});

describe("useUserStore", () => {
  beforeEach(() => {
    useUserStore.setState({ users: [] });
  });

  it("should initially have an empty users array", () => {
    const { users } = useUserStore.getState();
    expect(users).toEqual([]);
  });

  it("should fetch users and update state", async () => {
    const mockUsers = Array.from({ length: 5 }, generateMockUser);

    (axios.get as vi.Mock).mockResolvedValue({ data: mockUsers });
    localStorage.setItem("token", "mock-token");

    await useUserStore.getState().fetchUsers();

    expect(useUserStore.getState().users).toEqual(
      mockUsers.map((user) => ({ ...user, id: user._id })),
    );
  });

  it("should throw an error if no token is found", async () => {
    localStorage.removeItem("token");

    await expect(useUserStore.getState().fetchUsers()).rejects.toThrow(
      "No token found",
    );
  });

  it("should return a user when searching by username", async () => {
    const mockUsers = Array.from({ length: 3 }, generateMockUser);
    useUserStore.setState({ users: mockUsers });

    const searchResult = useUserStore
      .getState()
      .searchUser(mockUsers[1].username);
    expect(searchResult).toEqual(mockUsers[1]);
  });

  it("should return undefined if user is not found", () => {
    useUserStore.setState({ users: [] });
    expect(useUserStore.getState().searchUser("nonexistent")).toBeUndefined();
  });
});
