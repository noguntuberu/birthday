import axios from "axios";


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
    return res.data; 
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user"); 
  }
}
export const sendFriendRequest= async (friendId:any)=>{
  const response = await axios.post("http://localhost:3000/api/friendRequest/send",{friendId}, config );

  if (response.status=== 201){
    console.log(response)
  }
}






