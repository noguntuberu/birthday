import axios from "axios";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: token,
  },
};
const url = "http://localhost:3000/api";

export const fetchFriendRequests = async () => {
  const response = await axios.get(`${url}/friends/requests`, config);
  return response.data.friendRequests;
};

export const fetchFriends = async () => {
  const response = await axios.get(`${url}/friends`, config);
  return response.data.friends;
};

export const sendFriendRequest = async (friendId: string) => {
  await axios.post(`${url}/friendRequest/send`, { friendId: friendId }, config);
  return true;
};

export const acceptFriendRequest = async (friendId: string) => {
  await axios.post(
    `${url}/friendRequest/accept`,
    { friendId: friendId },
    config,
  );
  return true;
};

export const rejectFriendRequest = async (friendId: string) => {
  await axios.post(
    `${url}/friendRequest/reject`,
    { friendId: friendId },
    config,
  );
  return true;
};

export const removeFriend = async (friendId: string) => {
  await axios.delete(`${url}/friend/${friendId}`, config);
  return true;
};
