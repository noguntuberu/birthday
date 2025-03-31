import { useEffect, useState } from "react";
import { useUserStore } from "./userStore";
import "./search.css";
import SendFriendRequest from "../sendFriendReq";

export default function Search() {
  const { users, fetchUsers } = useUserStore();
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    fetchUsers();
    console.log("Users from API:", useUserStore.getState().users);
  }, []);

  useEffect(() => {
    if (!users || users.length === 0) return;
    console.log("Fetched Users:", users);
    if (query.trim() === "") {
      setFilteredUsers(users);
      console.log("Filtered Users:", filteredUsers);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  }, [query, users]);

  return (
    <div className="search_wrapper">
      <input
        type="text"
        placeholder="Search for users"
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h2 className="list">List of users</h2>
      {filteredUsers.length === 0 ? (
        <p>User not found</p>
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <div key={user._id} className="user-add-display">
              <div className="username_email">
                <b>{user.username}</b>
                <small>{user.email}</small>
              </div>
              <SendFriendRequest receiverId={user._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
