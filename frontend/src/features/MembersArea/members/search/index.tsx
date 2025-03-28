import { useEffect, useState } from "react";
import { useUserStore } from "./userStore";
import "./search.css";

export default function Search() {
  const { users, fetchUsers } = useUserStore();
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  }, [query, users]);

  return (
    <div className="search wrapper">
      <input
        type="text"
        placeholder="Search for users"
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h2>Users</h2>
      {filteredUsers.length === 0 ? (
        <p>User not found</p>
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <p key={user.username}>
              <strong>{user.username}</strong> - {user.email}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
