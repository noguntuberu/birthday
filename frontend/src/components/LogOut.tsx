import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <p className="log-out" onClick={handleLogout}>
      {token ? "Log out" : "Log in"}
    </p>
  );
};

export default Logout;
