import { useFriends } from "../../../../hooks/useFriends";
import Accept from "./Accept";
import Reject from "./Reject";
import "./friends.css";
import { ToastContainer } from "react-toastify";
import { displayName } from "../../../../utils/helperfunctions";
const FriendRequestList = () => {
  const { requests } = useFriends();

  return (
    <section className="main-container">
      <h3 className="title">Friend Request List</h3>
      {requests?.length === 0 ? (
        <p className="no-friend">You don't have any pending friend requests</p>
      ) : (
        <div className="content-case">
          {requests.map((friend) => (
            <div key={friend?._id} className="user-add-display">
              <div className="username_email">
                <b>{friend?.username}</b>
                <small>
                  {friend?.firstName && friend?.lastName
                    ? displayName(friend)
                    : friend?.email || "No email available"}
                </small>
              </div>
              <div className="buttons-case">
                <Accept userId={friend?._id} />
                <Reject userId={friend?._id} />
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};
export default FriendRequestList;
