import "../../../Register/form.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema, { FormData } from "./helper";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const FormComponent = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setValue("image", file);
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName(null);
      setPreview(null);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <p className="title">Update Profile</p>
        <p className="message">Fill in the details below.</p>

        <div className="form-group">
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="form-input"
            id="firstName"
            type="text"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="form-input"
            id="lastName"
            type="text"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
            className="form-input"
            id="dob"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="hobbies">
            Hobbies
          </label>
          <input
            {...register("hobbies")}
            className="form-input"
            id="hobbies"
            type="text"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            {...register("location")}
            className="form-input"
            id="location"
            type="text"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="image">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-input"
            id="image"
            onChange={handleFileChange}
          />
          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image.message}</p>
          )}
        </div>

        {selectedFileName && (
          <p className="text-sm text-gray-600">
            Selected file: {selectedFileName}
          </p>
        )}
        {preview && (
          <div>
            <p>Preview:</p>
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="form_btn">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default FormComponent;
