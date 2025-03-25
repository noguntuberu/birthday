import "../features/MembersArea/members/profile/profile.css";

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
      <button>Accept</button>
      <button>Reject</button>
      </div>
    </div>
  </div>
  );
};

const friendRequests = [1,2,3,4,5,6]

export const FriendRequests = () => {
  return (
    <div className="scroll-container">
      {friendRequests.map((e) => (
        <FriendRequest
          key={e}
          username="Zakariah"
          firstName="Antonio"
          lastName="Rudiger"
        />
      ))}
    </div>
  );
};