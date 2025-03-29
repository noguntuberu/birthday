import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Friend } from "../../../../types/Friends";
import "./profile.css";

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState<Friend | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/api/otherUsers/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserProfile(data))
        .catch((error) => console.error("Error fetching user profile:", error));
    }
  }, [userId]);

  if (!userProfile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container p-4">
      <h2 className="text-lg font-bold">{userProfile.name}</h2>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email || "N/A"}</p>
      <p>Date of Birth: {userProfile.dob || "N/A"}</p>
      <p>Location: {userProfile.location || "N/A"}</p>
      <p>Hobbies: {userProfile.hobbies || "N/A"}</p>
    </div>
  );
};

export default OtherUserProfile;
