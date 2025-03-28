import { useState, useEffect } from "react";
import { Friend } from "../types/Friends";
import {
  fetchFriendRequests,
  fetchFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "../services/friendService";

export const useFriends = () => {
  const [friendRequests, setFriendRequests] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  useEffect(() => {
    fetchFriendRequests().then(setFriendRequests).catch(console.error);

    fetchFriends().then(setFriends).catch(console.error);
  }, []);

  const handleSendRequest = async (friendId: string) => {
    const response = await sendFriendRequest(friendId);
    if (response.ok) console.log("Friend request sent");
    else console.error("Failed to send friend request");
  };

  const handleAcceptRequest = async (friendId: string) => {
    const response = await acceptFriendRequest(friendId);
    if (response.ok) {
      setFriendRequests((prev) => prev.filter((f) => f.id !== friendId));
      const acceptedFriend = friendRequests.find((f) => f.id === friendId);
      if (acceptedFriend) setFriends((prev) => [...prev, acceptedFriend]);
    } else console.error("Failed to accept request");
  };

  const handleRejectRequest = async (friendId: string) => {
    const response = await rejectFriendRequest(friendId);
    if (response.ok)
      setFriendRequests((prev) => prev.filter((f) => f.id !== friendId));
    else console.error("Failed to reject request");
  };

  const handleRemoveFriend = async (friendId: string) => {
    const response = await removeFriend(friendId);
    if (response.ok)
      setFriends((prev) => prev.filter((f) => f.id !== friendId));
    else console.error("Failed to remove friend");
  };

  return {
    friendRequests,
    friends,
    selectedFriend,
    setSelectedFriend,
    handleSendRequest,
    handleAcceptRequest,
    handleRejectRequest,
    handleRemoveFriend,
  };
};
