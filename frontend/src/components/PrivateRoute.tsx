import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const isTokenExpired = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export default PrivateRoute;
