import axios from "axios";


const url = "http://localhost:3000/api";

export const getNotifications = async ()=>{
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  try {
    const res = await axios.get(`${url}/notifications`,config); 
    return res.data;
  } catch (error:any) {
    console.error(error.message);
    throw new Error("Failed to fetch user"); 
  }
}

export const deleteAllNotifications = async ()=>{
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  try {
    await axios.delete(`${url}/notifications`,config); 
    return true;
  } catch (error:any) {
    console.error(error.message);
    throw new Error("Failed to delete notification"); 
  }
}

export const deleteNotification = async (id: number)=>{
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  try {
    await axios.delete(`${url}/notifications/${id}`,config); 
    return true;
  } catch (error:any) {
    console.error(error.message);
    throw new Error("Failed to delete notification"); 
  }
}

export const readNotification = async (id: number)=>{
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  try {
    await axios.patch(`${url}/notifications/${id}`,config); 
    return true;
  } catch (error:any) {
    console.error(error.message);
    throw new Error("Failed to read notification"); 
  }
}

export const readAllNotifications = async ()=>{
  const token = localStorage.getItem("token");
  const config = {
  headers: {
    Authorization: token 
  },
  }; 
  try {
    await axios.patch(`${url}/notifications/`,config); 
    return true;
  } catch (error:any) {
    console.error(error.message);
    throw new Error("Failed to read notifications"); 
  }
}