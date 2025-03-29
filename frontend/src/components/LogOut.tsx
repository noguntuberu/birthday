import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {

    await localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    const newToken = localStorage.getItem("token");
    console.log(newToken)
    navigate("/login");
  };

  return <p className="log-out" onClick={handleLogout}>{token ? "Log out": "Log in"}</p>;
};

export default Logout;