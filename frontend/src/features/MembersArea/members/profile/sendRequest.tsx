import { useFriends } from "../../../../hooks/useFriends";
import { useState } from "react";
import RemoveFriend from "../friends/Remove";
const AddFriend= ({userId}:{ userId: string })=>{
  const {handleSendFriendRequest,friends, sentRequests}= useFriends();
  const [isSent, setIssent] = useState<boolean>(false);
  if (sentRequests.some(e=>e._id===userId)){
    setIssent(true)
  }
  if (friends.some(e=>e._id===userId)){
    return(
      <RemoveFriend 
      key ={userId}
      userId={userId}/>
    );
  }
  return (
    <div className="btn-case" onClick={()=>handleSendFriendRequest(userId)}>
      <button disabled={isSent} className={isSent ? "view-btn": "view-btn disabled"}>
        Add
      </button>
    </div>
  )
}

export default AddFriend;
