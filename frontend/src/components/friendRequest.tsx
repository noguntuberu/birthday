import "../features/MembersArea/members/profile/profile.css";
import { useFriends } from "../hooks/useFriends";

export const FriendRequest = (props: any) => {
  return (
    <div className="scroll-item">
      <div className="item-container">
        <h1 className="username">{props.username}</h1>
        <div className="names">
          <span>
            {props.firstName ? props.firstName : props.username + " "}
          </span>
          <span>{props.lastName ? props.lastName : ""}</span>
        </div>
        <div>
          <button className="green-btn" onClick={() => props.onAccept()}>
            Accept
          </button>
          <button className="red-btn" onClick={() => props.onReject()}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export const FriendRequests = () => {
  const { requests, requestError, handleAccept, handleReject } = useFriends();

  return (
    <div className="scroll-container">
      {requestError.fetch ? (
        <p>{requestError.fetch}</p>
      ) : requests.length !== 0 ? (
        requests.map((e) => (
          <FriendRequest
            key={e._id}
            username={e.username}
            firstName={e.firstName}
            lastName={e.lastName}
            onAccept={() => handleAccept(e._id)}
            onReject={() => handleReject(e._id)}
          />
        ))
      ) : (
        <h2>You Don't have Any Friend Request Available</h2>
      )}
    </div>
  );
};
