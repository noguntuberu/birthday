import { useFriends } from "../../../../hooks/useFriends";
const Reject= (userId:any)=>{
  const {handleReject}= useFriends();
  return (
    <div className="btn-case" >
      <button className="remove-btn"onClick={()=>handleReject(userId)}>
        Reject
      </button>
    </div>
  )
}

export default Reject;
