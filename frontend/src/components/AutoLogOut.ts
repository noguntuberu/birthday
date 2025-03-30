import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (location.pathname === "/login" || location.pathname === "/register") {
        return;
      }


      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        navigate("/login", {replace:true});
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 6000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];

    if (!payloadBase64) {
      return true;
    }

    const decoded = JSON.parse(atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/")));

    if (!decoded.exp) {
      return true;
    }

    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export default AutoLogout;
