import { useFriends } from "../../../../hooks/useFriends";
const RemoveFriend= ({userId}:{ userId: string })=>{
  const {handleRemoveFriend}= useFriends();
  return (
    <div className="btn-case" >
      <button className="remove-btn" onClick={()=>handleRemoveFriend(userId)}>
        Remove
      </button>
    </div>
  )
}

export default RemoveFriend;
