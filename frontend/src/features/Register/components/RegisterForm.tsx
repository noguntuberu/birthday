import "../form.css";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import schema, { RegisterFormData } from "../helpers/validation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    axios
      .post("http://localhost:3000/api/register", data)
      .then(() => {
        reset();
        toast.success("Signup Successful!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        toast.error(`Signup Failed. ${error.message}`);
      });
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form">
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="form-group">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            {...register("username")}
            id="username"
            type="text"
            className="form-input"
          />
          {errors.username && <p className="err">{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="form-input"
          />
          {errors.email && <p className="err">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form-input"
            data-testid="password"
          />
          {errors.password && <p className="err">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm" className="label">
            Confirm Password
          </label>
          <input
            {...register("passwordConfirm")}
            id="passwordConfirm"
            type="password"
            className="form-input"
            data-testid="passwordConfirm"
          />
          {errors.passwordConfirm && (
            <p className="err">{errors.passwordConfirm.message}</p>
          )}
        </div>
        <button type="submit" className="form_btn">
          Submit
        </button>
        <p className="signin">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Login
          </span>
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
