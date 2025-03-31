import { useFriends } from "../../../../hooks/useFriends";
const Accept= ({userId}:{ userId: string })=>{
  const {handleAccept}= useFriends();
  return (
    <div className="btn-case" onClick={()=>handleAccept(userId)}>
      <button className="view-btn">
        Accept
      </button>
    </div>
  )
}

export default Accept;
