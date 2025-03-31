import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline, IoMdMenu } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "../../../components/LogOut";
import "./sidebar.css";
import { FaList, FaCog } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useNotifications } from "../../../hooks/useNotifications";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);
  const {unread}= useNotifications();

  const HandleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="sidebar-wrapper">
      <nav>
        <div className="logo">
          Go <br /> Birthday
        </div>
        <div className="menu" onClick={HandleMenu} data-testid="menu-icon">
          <IoMdMenu />
        </div>
      </nav>

      {openMenu ? (
        <div className="sidebar-content">
          <Link to="/" className="link" id="home">
            <div className="content-gap" onClick={closeMenu}>
              <GoHome className="mem-icons" />
              <p className="search-text">Home</p>
            </div>
          </Link>
          <Link to="/profile" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <CgProfile className="mem-icons" />
              <p className="search-text">Profile</p>
            </div>
          </Link>
          <Link to="/search" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <CiSearch className="mem-icons" />
              <p className="search-text">Search</p>
            </div>
          </Link>
          <Link to="/notifications" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <IoIosNotificationsOutline className="mem-icons" />
              <p className="search-text">Notifications <span className={unread ?"red": ""}>{unread? unread : null}</span></p>
            </div>
          </Link>
          <Link to="/friendslist" className="link">
            <div className="content-gap" onClick={closeMenu}>
            <FaList size={15} />
              <p className="search-text">Friends List</p>
            </div>
          </Link>
          <Link to="/friendRequests" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <FiUser size={15} color="white" />
              <p className="search-text">Friend Requests</p>
            </div>
          </Link>
          <Link to="/editProfile" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <FaCog size={15} />
              <p className="search-text">Update Profile</p>
            </div>
          </Link>
          <Link to="/explore" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <MdOutlineExplore className="mem-icons" />
              <p className="search-text">Explore</p>
            </div>
          </Link>
          <Link to="/login" className="link">
            <div className="content-gap" onClick={closeMenu}>
              <Logout />
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
