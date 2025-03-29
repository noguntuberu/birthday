// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./profileEdit.css";
// import { ProfileData, ProfileFormProps } from "../../../../types/profileTypes";

import "../../../Register/form.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import schema, { ProfileFormData } from "./helper";
import { submitEdit } from "./edit";

const ProfileForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await submitEdit(data);
      toast.success("Submitted Successfully!");
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form">
        <p className="title">Edit Profile</p>
        <p className="message">Update your details.</p>

        <div className="form-group">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            type="text"
            className="form-input"
          />
          {errors.firstName && (
            <p className="err">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            type="text"
            className="form-input"
          />
          {errors.lastName && <p className="err">{errors.lastName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="hobbies" className="label">
            Hobbies
          </label>
          <input
            {...register("hobbies")}
            id="hobbies"
            type="text"
            className="form-input"
          />
          {errors.hobbies && <p className="err">{errors.hobbies.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="label">
            Location
          </label>
          <input
            {...register("location")}
            id="location"
            type="text"
            className="form-input"
          />
          {errors.location && <p className="err">{errors.location.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dob" className="label">
            Date of Birth
          </label>
          <input
            {...register("dob")}
            id="dob"
            type="date"
            className="form-input"
          />
          {errors.dob && <p className="err">{errors.dob.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gender" className="label">
            Gender
          </label>
          <select {...register("gender")} id="gender" className="form-input">
            <option value="">Select Gender (optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="err">{errors.gender.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

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
    </>
  );
};

export default ProfileForm;

// const EditProfilePage: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState<ProfileData>({
//     username: 'John Doe',
//     bio: 'Web Developer | Tech Enthusiast | Blogger',
//     dob: '1995-01-15',
//     hobbies: 'Coding, Gaming, Traveling',
//     location: 'Lagos, Nigeria',
//     email: 'johndoe@example.com',
//     posts: 120,
//     followers: 10500,
//     following: 500,
//     friends: ['Alice Johnson', 'Michael Smith', 'Sarah Williams', 'David Brown']
//   });

//   const [formData, setFormData] = useState<ProfileData>({ ...profileData });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get<ProfileData>('/api/profile');
//         setProfileData(response.data);
//         setFormData(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           image: reader.result as string
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put<ProfileData>('/api/profile', formData);
//       setProfileData(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <div className="profile-container">
//       {isEditing ? (
//         <ProfileForm
//           formData={formData}
//           handleInputChange={handleInputChange}
//           handleImageUpload={handleImageUpload}
//           handleSubmit={handleSubmit}
//           setIsEditing={setIsEditing}
//         />
//       ) : (
//         <ProfileView
//           profileData={profileData}
//           setIsEditing={setIsEditing}
//         />
//       )}
//     </div>
//   );
// };

// export default EditProfilePage;
