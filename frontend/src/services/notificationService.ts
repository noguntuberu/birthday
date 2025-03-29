import axios from "axios";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: token,
  },
};

const url = "http://localhost:3000/api";

export const getNotifications = async () => {
  try {
    const res = await axios.get(`${url}/notifications`, config);
    return res.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to fetch user");
  }
};

export const deleteAllNotifications = async () => {
  try {
    await axios.delete(`${url}/notifications`, config);
    return true;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to delete notification");
  }
};

export const deleteNotification = async (id: number) => {
  try {
    await axios.delete(`${url}/notifications/${id}`, config);
    return true;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to delete notification");
  }
};

export const readNotification = async (id: number) => {
  try {
    await axios.patch(`${url}/notifications/${id}`, config);
    return true;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to read notification");
  }
};

export const readAllNotifications = async () => {
  try {
    await axios.patch(`${url}/notifications/`, config);
    return true;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to read notifications");
  }
};
