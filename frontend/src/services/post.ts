import axios from "axios";

const url = "http://localhost:3000/api";

export const getUser = async ()=>{
  try {
    const res = await axios.get("https://dummyjson.com/users/1");
    return res.data; 
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user"); 
  }
}
let token = "i dont care";
const config = {
  headers: {
    Authorization: token,
  }
}

export const getFriends = async ()=>{
  try {
    const res = await axios.get('https://dummyjson.com/users?limit=7&skip=10&select=firstName,lastName,username,id');
    
    return res.data.users; 
  } catch (error) {
    console.log("Error fetching friends:", error);
    throw new Error("Failed to fetch friends"); 
  }
}

export const getFriendRequests = async ()=> {
  try {
    const res = await axios.get('https://dummyjson.com/users?limit=7&skip=10&select=firstName,lastName,username,id');

    return res.data.users;
  } catch (error) {
    console.log("Error fetching requests:", error);
    throw new Error("Failed to fetch requests"); 
  }
}

export const removeFriend = async (friendId:any)=>{
  try {
   await axios.delete(`${url}/friends/${friendId}`, config);
    return true;
  } catch (error:any) {
    throw new Error(error.message)
  }
}
export const sendFriendRequest= async (friendId:any)=>{
try {
  await axios.post("http://localhost:3000/api/friendRequest/send",{friendId}, config );
  return true;
  
} catch (error) {
  console.log("Error sending request", error);
  throw new Error("Failed to send request");
}
  
}

export const acceptFriendRequest = async (friendId:any)=>{
  try {
    await axios.post(`${url}/friendRequest/accept`,{friendId}, config );
    return true;
    
  } catch (error) {
    console.log("Error accepting request", error);
    throw new Error("Failed to accept request");
  }
}

export const rejectFriendRequest = async (friendId:any)=>{
  try {
    await axios.post(`${url}/friendRequest/reject`,{friendId}, config );
    return true;
    
  } catch (error) {
    console.log("Error rejecting request", error);
    throw new Error("Failed to reject request");
  }
}




