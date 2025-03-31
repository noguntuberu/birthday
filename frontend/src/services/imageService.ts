import axios from "axios";

const url = "http://localhost:3000/api";

export const getImage = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await axios.get(`${url}/images`, config);
    return res.data.image;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to fetch image");
  }
};

export const getOthersImage = async (userId: string) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await axios.get(`${url}/images/${userId}`, config);
    return res.data.image;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to fetch image");
  }
};
