import axios from "axios";
import { toast } from "react-toastify";

export interface LoginResponse {
  token: string;
  userId: string;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ token: string }> {
  try {
    const response = await axios.post<{ token: string }>(
      "http://localhost:3000/api/login",
      { email, password },
    );
    const { token } = response.data;

    if (!token) throw new Error("Invalid login response.");

    localStorage.setItem("token", token);

    return { token };
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);

    const errorMessage = error.response?.data?.error || "Login failed.";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}
