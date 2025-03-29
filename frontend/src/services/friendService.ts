import axios from "axios";


const url = "http://localhost:3000/api";

export const fetchFriendRequests = async () => {
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  };
  const response = await axios.get(`${url}/friends/requests`,config);
  return response.data.friendRequests;
};

export const fetchFriends = async () => {
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  const response = await axios.get(`${url}/friends`,config);
  return response.data.friends;
};

export const sendFriendRequest = async (friendId: string) => {
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  await axios.post(`${url}/friendRequest/send`,{friendId: friendId}, config );
  return true;
};

export const acceptFriendRequest = async (friendId: string) => {
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  await axios.post(`${url}/friendRequest/accept`,{friendId: friendId}, config );
  return true;
};

export const rejectFriendRequest = async (friendId: string) => {
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  await axios.post(`${url}/friendRequest/reject`,{friendId: friendId}, config );
  return true;
};

export const removeFriend = async (friendId: string) => {
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  await axios.delete(`${url}/friend/${friendId}`, config);
  return true;
};
