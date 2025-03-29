import axios from "axios";

export const sendFriendRequest = async (
  receiverId: string,
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    console.log("Raw token from storage:", `"${token}"`);

    if (!receiverId) {
      console.error("Invalid receiverId:", receiverId);
      return false;
    }

    console.log("Sending friend request to:", receiverId);

    const response = await axios.post(
      "http://localhost:3000/api/friendRequest/send",
      { receiverId },
      {
        headers: {
          Authorization: token.trim(),
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.success) {
      console.log("Friend request sent successfully!");
      return true;
    } else {
      console.error("Friend request failed:", response.data.error);
      return false;
    }
  } catch (error) {
    console.error("Failed to send friend request:", error);
    return false;
  }
};
