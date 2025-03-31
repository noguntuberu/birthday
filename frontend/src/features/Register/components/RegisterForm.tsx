import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define validation schema
const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

// Define form data type
type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post("http://localhost:3000/api/register", data);
      reset();
      toast.success("Signup Successful!");
    } catch (error: any) {
      toast.error(`Signup Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form">
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        <div className="form-group">
          <label htmlFor="username" className="label">Username</label>
          <input
            {...register("username")}
            id="username"
            type="text"
            className="form-input"
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && <p className="err">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="label">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="form-input"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="err">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="label">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form-input"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="err">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirm" className="label">Confirm Password</label>
          <input
            {...register("passwordConfirm")}
            id="passwordConfirm"
            type="password"
            className="form-input"
            aria-invalid={errors.passwordConfirm ? "true" : "false"}
          />
          {errors.passwordConfirm && <p className="err">{errors.passwordConfirm.message}</p>}
        </div>

        <button type="submit" className="form_btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <p className="signin">
          Already have an account? <span className="signup-link" onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={1700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RegisterForm;
