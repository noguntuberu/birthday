import "../features/MembersArea/members/profile/profile.css";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
} from "../services/post";
import { useState, useEffect } from "react";
import { toast} from "react-toastify";

export const FriendRequest = (props: any) => {
  return (
    <div className="scroll-item">
      <div className="item-container">
        <h1 className="username">{props.username}</h1>
        <div className="names">
          <span>{props.firstName + " "}</span>
          <span>{props.lastName}</span>
        </div>
        <div>
          <button className="green-btn" onClick={() => props.onAccept()}>Accept</button>
          <button className="red-btn" onClick={() => props.onReject()}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export const FriendRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState<any | null>({
    fetch: "",
    accept: "",
    reject: "",
  });
  useEffect(() => {
    async function fetchRequests() {
      try {
        const result = await getFriendRequests();
        setRequests(result);
      } catch (err: any) {
        setError({ ...error, fetch: err.message });
      }
    }
    fetchRequests();
  }, []);

  async function handleAccept(id:any){
    try {
      await acceptFriendRequest(id);
      setRequests((prev)=>prev.filter(user=> user.id!==id));
      toast.success("Request succfully accepted");
    } catch (error:any) {
      setError({...error, accept: error.message});
      toast.error(error.message);
    }
  }

  async function handleReject(id:any){
    try {
      await rejectFriendRequest(id);
      setRequests((prev)=>prev.filter(user=> user.id!==id));
    } catch (error:any) {
      setError({...error, reject: error.message});
      toast.error(error.message);
    }
  }

  return (
    <div className="scroll-container">
      {error.fetch ? (
        <p>{error.fetch}</p>
      ) : requests.length !== 0 ? (
        requests.map((e) => (
          <FriendRequest
            key={e.id}
            username={e.username}
            firstName={e.firstName}
            lastName={e.lastName}
            onAccept={()=>handleAccept(e.id)}
            onReject={()=>handleReject(e.id)}
          />
        ))
      ) : (
        <h2>You Don't have Any Friend Request Available</h2>
      )}
    </div>
  );
};
