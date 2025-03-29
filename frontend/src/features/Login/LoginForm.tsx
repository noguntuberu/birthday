import "../Register/form.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import schema, { LoginFormData } from "./helper";
import { loginUser } from "./login";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data.email, data.password);
    toast.success("Login Successful!");
    reset();
    navigate("/");
  };

  return (
    <div className="form_wrapper" id="login_form">
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form">
        <p className="title">Login</p>
        <p className="message">Login to access to our app.</p>

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
        <button type="submit" disabled={isSubmitting} className="form_btn">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p className="signin">
          Don't have an account?
          <span className="signup-link" onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>
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
    </div>
  );
};

export default LoginForm;
