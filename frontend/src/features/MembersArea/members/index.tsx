import { ToastContainer } from "react-toastify";
import {
  displayName,
  getInitials,
  getNextBirthday,
  getFirst3,
  sortFriendsByNextBirthday,
} from "../../../utils/helperfunctions";
import { useUser } from "../../../hooks/useUser";
import "./members.css";
export default function Members() {
  const { user, error, loading } = useUser();

  return (
    <div>
      <div className="large-fields">
        <h1 className="large-body">
          {" "}
          This App is currently not Available to Large screen users
        </h1>
        <div className="profile-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: `red` }}>{error}</p>
          ) : (
            <>
              <div className="initials-container">
                <div className="initials">{getInitials(user)}</div>
                <h2 className="username">{user ? displayName(user) : "N/A"}</h2>
              </div>
              <div className="birthday-container">
                <h1 className="birthday">
                  {user?.dob
                    ? getNextBirthday(user.dob)
                    : "I don't have a birthday yet"}
                </h1>
              </div>

              <div className="upcoming-bd">
                <ul>
                  {getFirst3(
                    sortFriendsByNextBirthday(user?.friends || []),
                  ).map((friend) => (
                    <li key={friend.name}>{displayName(friend)}</li>
                  ))}
                </ul>
              </div>

              <div className="top-notifications">
                {getFirst3(
                  user?.notifications?.reverse().map((notification: any) => {
                    <li>{notification.message}</li>;
                  }),
                )}
              </div>
            </>
          )}
        </div>
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
      </div>
    </div>
  );
}
