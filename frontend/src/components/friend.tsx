import "../features/MembersArea/members/profile/profile.css";
import { useEffect, useState } from "react";
import { getFriends } from "../services/post";

const Friend = ({ id, username, firstName, lastName, onRemove }: any) => {
  return (
    <div className="scroll-item">
      <div className="item-container">
        <h1 className="username">{username}</h1>
        <div className="names">
          <span>{firstName + " "}</span>
          <span>{lastName}</span>
        </div>
        <div>
          <button onClick={() => onRemove(id)}>Remove</button>
          <button>View</button>
        </div>
      </div>
    </div>
  );
};

export const Friends = () => {
  const [friends, setFriends] = useState<any[]| null >([]);
  const [error, setError] = useState<string | null>("");

  useEffect(()=>{
        async function fetchUser() {
          try {
            const friendsData = await getFriends();
            setFriends(friendsData);
          } catch (err) {
            setError("Error fetching user data.");
          }
        }
    
        fetchUser();
  },[]);

  const removeFriend = (id: number) => {
    setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
  };

  return (
    <div className="scroll-container">
      {friends.map((friend) => (
        <Friend key={friend.id} {...friend} onRemove={removeFriend} />
      ))}
    </div>
  );
};
