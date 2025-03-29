import axios from "axios";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: token,
  },
};
console.log(token);

const url = "http://localhost:3000/api";

export const getUser = async () => {
  try {
    const res = await axios.get(`${url}/users/me`, config);
    return res.data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to fetch user");
  }
};
