import "../features/MembersArea/members/profile/profile.css";
// import {useEffect, useState } from "react";
// import { removeFriend, fetchFriends } from "../services/friendService";
// import { toast } from "react-toastify";
import { useFriends } from "../hooks/useFriends";
import { Link } from "react-router-dom";

const Friend = ({ _id, username, firstName, lastName, onRemove }: any) => {
  return (
    <div className="scroll-item">
      <div className="item-container">
        <h1 className="username">{username}</h1>
        <div className="names">
          <span>{firstName ? firstName : username + " "}</span>
          <span>{lastName ? lastName : ""}</span>
        </div>
        <div>
          <button className="red-btn" onClick={() => onRemove(_id)}>
            Remove
          </button>
          <Link to={`/profile/${_id}`}>
            <button className="green-btn">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Friends = () => {
  const { friends, friendError, handleRemoveFriend } = useFriends();

  return (
    <div className="scroll-container">
      {friendError.fetchFriends ? (
        <p className="err">{friendError.fetchFriends}</p>
      ) : friends.length !== 0 ? (
        friends.map((friend) => (
          <Friend
            key={friend._id}
            {...friend}
            onRemove={() => handleRemoveFriend(friend._id)}
          />
        ))
      ) : (
        <h2>You don't have any friends</h2>
      )}
    </div>
  );
};
