import "../features/MembersArea/members/profile/profile.css";
import { useEffect, useState } from "react";
import { getFriends, removeFriend } from "../services/post";
import { toast } from "react-toastify";

const Friend = ({ id, username, firstName, lastName, onRemove }: any) => {
  return (
    <div className="scroll-item">
      <div className="item-container">
        <h1 className="username">{username}</h1>
        <div className="names">
          <span>{firstName + " "}</span>
          <span>{lastName}</span>
        </div>
        <div>
          <button className="red-btn" onClick={() => onRemove(id)}>Remove</button>
          <button className="green-btn">View</button>
        </div>
      </div>
    </div>
  );
};

export const Friends = () => {
  const [friends, setFriends] = useState<any[] >([]);
  const [error, setError] = useState<any | null>({
    fetchFriends: "",
    removeFriend: "",
  });

  useEffect(()=>{
        async function fetchFriends() {
          try {
            const friendsData = await getFriends();
            setFriends(friendsData);
          } catch (err) {
            setError({...error, fetchFriends: "Error fetching friends"});
            toast.error(error.message);
          }
        }
    
        fetchFriends();
  },[]);

  const handleRemoveFriend = async (id: any) => {
    try{
      await removeFriend(id);
      setFriends((prev:any)=>(prev.filter((friend:any) => friend?.id !== id)));
    }catch(err: any){
      setError({...error, removeFriend: "Error removing friend"});
      toast.error(err.message);
    }
  };

  return (
    <div className="scroll-container">
      {error.fetchFriends ? <p className="err">{error.fetchFriends}</p>: friends.length!==0 ? (friends?.map((friend) => (
        <Friend key={friend.id} {...friend} onRemove={()=>handleRemoveFriend(friend.id)} />
      ))): <h2>You don't have any friends</h2>}
    </div>
  );
};
