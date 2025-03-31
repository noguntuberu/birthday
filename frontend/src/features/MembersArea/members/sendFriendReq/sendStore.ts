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
      alert("Friend request sent successfully!");
      return true;
    }

    if (
      typeof response.data === "string" &&
      response.data.includes("already sent")
    ) {
      alert("Friend request already sent!");
      return false;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      if (error.response.data.includes("already sent")) {
        alert("Friend request already sent!");
        return false;
      }
    }

    alert("Failed to send friend request. Please try again.");
    return false;
  }
};
