import "./profile.css";
import { Link } from "react-router-dom";
import { Friends } from "../../../../components/friend";
import { FriendRequests } from "../../../../components/friendRequest";
// import { useEffect, useState } from "react";
// import { getUser } from "../../../../services/userService";
import { displayName, getInitials } from "../../../../utils/helperfunctions";
import { ToastContainer } from "react-toastify";
import { useUser } from "../../../../hooks/useUser";

const ProfilePage = () => {
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

              <div className="occupation">
                <p className="occupation-label">Username</p>
                <p className="bio">{user?.username}</p>
              </div>

              <div className="info">
                <p className="hobbies titles">
                  <span>Hobbies:</span> {user?.hobbies ? user.hobbies : "N/A"}
                </p>
                <p className="Location titles">
                  <span>Location:</span>{" "}
                  {user?.location ? user.location : "N/A"}
                </p>
                <div className="before-Scroll">
                  <p>Friend Requests</p>
                  <div className="scroll-container">
                    <FriendRequests />
                  </div>
                </div>
                <p className="email titles">
                  <span>Email:</span> {user?.email ? user.email : ""}
                </p>
                <p className="dob titles">
                  <span>Date of Birth:</span>
                  {user?.birthDate ? user.birthDate : "N/A"}
                </p>
              </div>

              <div className="stats">
                <div className="nom-of-friends">
                  <p>Friends</p>
                  <span>{user.friends?.length || 0}</span>
                </div>
              </div>
              <div className="before-Scroll">
                <p>Friends</p>
                <div className="scroll-container">
                  <Friends />
                </div>
              </div>
              <Link to="/editProfile" className="link">
                <button className="edit-btn">Edit Profile</button>
              </Link>
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
};

export default ProfilePage;
