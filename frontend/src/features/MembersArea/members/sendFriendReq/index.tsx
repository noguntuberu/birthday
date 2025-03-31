import { sendFriendRequest } from "./sendStore";
import "./sendRequest.css"


interface Props {
  receiverId: string;
  disable: boolean;
}

export default function SendFriendRequest({ receiverId, disable }: Props) {
    const handleSendRequest = async () => {
    const success = await sendFriendRequest(receiverId);
    if (success) {
      alert("Friend request sent successfully!");
    } else {
      console.log("error");
    }
  };

  return (
    <button 
  disabled={disable} 
  onClick={handleSendRequest} 
  className={disable ? "bross" : "send-btn"}
>
  Add
</button>
  );
}
