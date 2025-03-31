import { useFriends } from "../../../../hooks/useFriends";
const Reject= (userId:any)=>{
  const {handleReject}= useFriends();
  return (
    <div className="btn-case" onClick={()=>handleReject(userId)}>
      <button className="remove-btn">
        Reject
      </button>
    </div>
  )
}

export default Reject;
