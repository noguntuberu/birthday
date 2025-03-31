import axios from "axios";
import { toast } from "react-toastify";

export async function submitEdit({
  firstName,
  lastName,
  hobbies,
  location,
  dob,
  gender,
}: any) {
  const token = localStorage.getItem("token");
  const config = <any>{
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.patch(
      "http://localhost:3000/api/users",
      { firstName, lastName, hobbies, location, dob, gender },
      config
    );
    toast.success(response.statusText);
  } catch (error: any) {
    console.error("submit error", error.response?.data || error.message);

    const errorMessage = error.response?.data?.error || "Submit Failed";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function submitImage(image: File) {
  const token = localStorage.getItem("token");
  const config = <any>{
    headers: {
      Authorization: token,
    },
  };
  console.log(token);

  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/images",
      formData ,
      config
    );
    toast.success(response.statusText);
  } catch (error: any) {
    console.error("submit error", error.response?.data || error.message);
    console.log(image);
    const errorMessage = error.response?.data?.error || "Uploading Failed";
    toast.error(errorMessage);
  }
}
