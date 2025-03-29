import { sendFriendRequest } from "./sendStore";
import "./sendRequest.css";

interface Props {
  receiverId: string;
}

export default function SendFriendRequest({ receiverId }: Props) {
  const handleSendRequest = async () => {
    const success = await sendFriendRequest(receiverId);
    if (success) {
      alert("Friend request sent successfully!");
    } else {
      console.log("error");
    }
  };

  return (
    <button onClick={handleSendRequest} className="send-btn">
      Add
    </button>
  );
}
