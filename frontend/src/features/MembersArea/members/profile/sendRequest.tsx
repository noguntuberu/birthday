import { useFriends } from "../../../../hooks/useFriends";
import { useState, useEffect } from "react";
import RemoveFriend from "../friends/Remove";


const AddFriend = ({ userId }: { userId: string }) => {
  const { handleSendFriendRequest, friends, sentRequests } = useFriends();
  const [isSent, setIsSent] = useState<boolean>(false);


  useEffect(() => {
    setIsSent(sentRequests.some((e) => e._id === userId));
  }, [sentRequests, userId]);

  if (friends.some((e) => e._id === userId)) {
    return <RemoveFriend key={userId} userId={userId} />;
  }

  return (
    <div className="btn-case" onClick={() => handleSendFriendRequest(userId)}>
      <button disabled={isSent} className={isSent ?  "view-btn-disabled": "view-btn"}>
        Add
      </button>
    </div>
  );
};

export default AddFriend;

