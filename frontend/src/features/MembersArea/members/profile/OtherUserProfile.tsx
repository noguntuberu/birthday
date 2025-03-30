import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
import {
  displayName,
  calculateAge,
  pascalCase,
  dateFormat,
} from "../../../../utils/helperfunctions";
import axios from "axios";

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/api/otherUsers/${userId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data)
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user profile:", error));
    }
  }, [userId]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <section className="page-container">
      <div className="page-head">
        <p className="head-text">Profile</p>
      </div>
      <div className="initials">
        <img
          src="https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g"
          alt="no image found"
          className="profile-img"
        />
      </div>
      <p className="user-name">{user ? displayName(user) : "N/A"}</p>
      <p className="age">
        {user?.dob ? `${calculateAge(user.dob)} years old` : "NA"}
      </p>
      <div className="details-container">
        <div className="name firstName">
          <p className="name-label">First Name</p>
          <h3>{user ? pascalCase(user.firstName) : "N/A"}</h3>
        </div>
        <div className="name lastName">
          <p className="name-label">Last Name</p>
          <h3>{user ? pascalCase(user.lastName) : "N/A"}</h3>
        </div>
        <div className="name dob">
          <p className="name-label">Date of Birth</p>
          <h3>{user?.dob ? dateFormat(user.dob) : "N/A"}</h3>
        </div>
        <div className="name lastName">
          <p className="name-label">Username</p>
          <h3>{user ? user.username : "N/A"}</h3>
        </div>
        <div className="name username">
          <p className="name-label">Email</p>
          <h3>{user ? user.email : "N/A"}</h3>
        </div>
        <div className="name hobbies">
          <p className="name-label">Hobbies</p>
          <h3>{user ? user.hobbies : "N/A"}</h3>
        </div>
        <div className="name location">
          <p className="name-label">Location</p>
          <h3>{user?.location ? user.location : "N/A"}</h3>
        </div>
      </div>
      <div className="foot"></div>
    </section>
  );
};

export default OtherUserProfile;
