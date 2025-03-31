import { useFriends } from "../../../../hooks/useFriends";
const RemoveFriend= ({userId}:{ userId: string })=>{
  const {handleRemoveFriend}= useFriends();
  return (
    <div className="btn-case" onClick={()=>handleRemoveFriend(userId)}>
      <button className="remove-btn">
        Remove
      </button>
    </div>
  )
}

export default RemoveFriend;
