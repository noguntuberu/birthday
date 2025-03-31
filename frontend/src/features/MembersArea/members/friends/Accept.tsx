import { useFriends } from "../../../../hooks/useFriends";
const Accept= ({userId}:{ userId: string })=>{
  const {handleAccept}= useFriends();
  return (
    <div className="btn-case" >
      <button className="view-btn" onClick={()=>handleAccept(userId)}>
        Accept
      </button>
    </div>
  )
}

export default Accept;
