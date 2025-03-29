import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const config = <any>{
  headers: {
    Authorization: token,
  },
};

export async function submitEdit({
  firstName,
  lastName,
  hobbies,
  location,
  dob,
  gender,
}: any) {
  try {
    const response = await axios.patch(
      "http://localhost:3000/api/users",
      { firstName, lastName, hobbies, location, dob, gender },
      config,
    );
    toast.success(response.statusText);
  } catch (error: any) {
    console.error("submit error", error.response?.data || error.message);

    const errorMessage = error.response?.data?.error || "Login failed.";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}
