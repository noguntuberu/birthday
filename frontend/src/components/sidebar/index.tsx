import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <div className="logo">
        Go <br /> Birthday
      </div>

      <div className="sidebar-content">
        <Link to="/" className="link" id="home">
          <div className="content-gap">
            <GoHome className="mem-icons" />
            <p className="search-text">Home</p>
          </div>
        </Link>
        <Link to="/profile" className="link">
          <div className="content-gap">
            <CgProfile className="mem-icons" />
            <p className="search-text">Profile</p>
          </div>
        </Link>
        <div className="content-gap">
          <CiSearch className="mem-icons" />
          <p className="search-text">Search</p>
        </div>
        <div className="content-gap">
          <IoIosNotificationsOutline className="mem-icons" />
          <p className="search-text">Notifications</p>
        </div>
        <Link to="/explore" className="link">
          <div className="content-gap">
            <MdOutlineExplore className="mem-icons" />
            <p className="search-text">Explore</p>
          </div>
        </Link>
        <p className="log-out">Log Out</p>
      </div>
    </div>
  );
}
