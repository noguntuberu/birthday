import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profileEdit.css';
import { ProfileData, ProfileFormProps, ProfileViewProps } from '../../../../types/profileTypes';

const ProfileView: React.FC<ProfileViewProps> = ({ profileData, setIsEditing }) => (
  <>
    <div className="profile-header">
      <img
        src={profileData.image || "https://via.placeholder.com/120"}
        alt="User Profile"
        className="profile-img"
      />
      <button 
        className="edit-btn"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
    </div>
    
    <h2 className="username">{profileData.username}</h2>
    <p className="bio">{profileData.bio}</p>

    <div className="info">
      <p>
        <span>Date of Birth:</span> {profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'N/A'}
      </p>
      <p>
        <span>Hobbies:</span> {profileData.hobbies}
      </p>
      <p>
        <span>Location:</span> {profileData.location}
      </p>
      <p>
        <span>Email:</span> {profileData.email}
      </p>
    </div>

    <div className="stats">
      <div>
        <p>Posts</p>
        <span>{profileData.posts}</span>
      </div>
      <div>
        <p>Followers</p>
        <span>{profileData.followers?.toLocaleString() || '0'}</span>
      </div>
      <div>
        <p>Following</p>
        <span>{profileData.following}</span>
      </div>
    </div>

    <div className="friends-list">
      <h3>Friends</h3>
      <ul>
        {(profileData.friends ?? []).map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>

    <button className="follow-btn">Follow</button>
  </>
);

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  formData, 
  handleInputChange, 
  handleImageUpload,
  handleSubmit,
  setIsEditing 
}) => (
  <form onSubmit={handleSubmit} className="edit-form">
    <div className="form-group">
      <label>Profile Image</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
      />
    </div>
    
    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-group">
      <label>Bio</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-group">
      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-group">
      <label>Hobbies</label>
      <input
        type="text"
        name="hobbies"
        value={formData.hobbies}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-group">
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="form-actions">
      <button type="submit" className="save-btn">Save Changes</button>
      <button 
        type="button" 
        className="cancel-btn"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </div>
  </form>
);

const EditProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'John Doe',
    bio: 'Web Developer | Tech Enthusiast | Blogger',
    dob: '1995-01-15',
    hobbies: 'Coding, Gaming, Traveling',
    location: 'Lagos, Nigeria',
    email: 'johndoe@example.com',
    posts: 120,
    followers: 10500,
    following: 500,
    friends: ['Alice Johnson', 'Michael Smith', 'Sarah Williams', 'David Brown']
  });

  const [formData, setFormData] = useState<ProfileData>({ ...profileData });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<ProfileData>('/api/profile');
        setProfileData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put<ProfileData>('/api/profile', formData);
      setProfileData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      {isEditing ? (
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          handleSubmit={handleSubmit}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProfileView 
          profileData={profileData} 
          setIsEditing={setIsEditing} 
        />
      )}
    </div>
  );
};

export default EditProfilePage;