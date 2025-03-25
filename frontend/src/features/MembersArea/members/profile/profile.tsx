import "./profile.css";
import { Link } from "react-router-dom";
import { Friends } from "../../../../components/friend";
import { FriendRequests } from "../../../../components/friendRequest";
import { useEffect, useState } from "react";
import { getUser } from "../../../../services/post";
import { displayName } from "../../../../utils/helperfunctions";

const ProfilePage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <div className="profile-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <div className="initials-container">
              <div className="initials">JD</div>
              <h2 className="username">{user? displayName(user):""}</h2>
            </div>

            <div className="occupation">
              <p className="occupation-label">Username</p>
              <p className="bio">{user?.username}</p>
            </div>

            <div className="info">
              <p className="hobbies titles">
                <span>Hobbies:</span> {user?.hobbies ? user.hobbies : ""}
              </p>
              <p className="Location titles">
                <span>Location:</span> Lagos, Nigeria
              </p>
              <div className="before-Scroll">
                <p>Friend Requests</p>
                <div className="scroll-container">
                  <FriendRequests/>
                </div>
              </div>
              <p className="email titles">
                <span>Email:</span> {user?.email ? user.email : ""}
              </p>
              <p className="dob titles">
                <span>Date of Birth:</span> {user?.birthDate ? user.birthDate : ""}
              </p>
            </div>

            <div className="stats">
              <div className="nom-of-friends">
                <p>Friends</p>
                <span>10.5K</span>
              </div>
            </div>
            <div className="before-Scroll">
              <p>Friends</p>
              <div className="scroll-container">
                <Friends/>
              </div>
            </div>
            <Link to="/" className="link">
              <button className="edit-btn">Edit Profile</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
