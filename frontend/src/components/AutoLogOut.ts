import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

// Function to Check Token Expiry
const isTokenExpired = (token: any) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Invalid token
  }
};

export default AutoLogout;
