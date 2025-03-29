import { useState, useEffect } from "react";
// import { Friend } from "../types/Friends";
import {
  fetchFriendRequests,
  fetchFriends,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "../services/friendService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useFriends = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [friendError, setFriendError] = useState({
    fetchFriends: "",
    removeFriend: "",
  });
  const [requestError, setRequestError] = useState({
    fetch: "",
    accept: "",
    reject: "",
  });
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getFriends() {
      try {
        const result = await fetchFriends();
        setFriends(result);
      } catch (err: any) {
        setFriendError({ ...friendError, fetchFriends: err.message });
      }
    }

    async function getRequests() {
      try {
        const result = await fetchFriendRequests();
        setRequests(result);
      } catch (err: any) {
        setRequestError({ ...requestError, fetch: err.message });
      }
    }

    const fetchData = () => {
      getFriends();
      getRequests();
    };
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  // const handleSendRequest = async (friendId: string) => {
  //   const response = await sendFriendRequest(friendId);
  //   if (response.ok===true) console.log("Friend request sent");
  //   else console.error("Failed to send friend request");
  // };
  async function handleAccept(id: any) {
    try {
      await acceptFriendRequest(id);
      setRequests((prev) => prev.filter((request) => request._id !== id));
      console.log(id);
      toast.success("Request succfully accepted");
    } catch (error: any) {
      setRequestError({ ...requestError, accept: error.message });
      console.log(id);
      toast.error(error.message);
      toast.error(id);
    }
  }

  async function handleReject(id: any) {
    try {
      await rejectFriendRequest(id);
      setRequests((prev) => prev.filter((user) => user.id !== id));
    } catch (error: any) {
      setRequestError({ ...requestError, reject: error.message });
      toast.error(error.message);
    }
  }
  const handleRemoveFriend = async (id: string) => {
    try {
      await removeFriend(id);
      toast.success("Successfully removed friend");
      setFriends((prev) => prev.filter((friend) => friend._id !== id));
    } catch (err: any) {
      setFriendError((prevError) => ({
        ...prevError,
        removeFriend: err.message,
      }));
      toast.error(err.message);
    }
  };

  return {
    requests,
    friends,
    selectedFriend,
    friendError,
    requestError,
    setSelectedFriend,
    // handleSendRequest,
    handleAccept,
    handleReject,
    handleRemoveFriend,
  };
};
