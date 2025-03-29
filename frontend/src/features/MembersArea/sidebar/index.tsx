import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline, IoMdMenu } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "../../../components/LogOut";
import "./sidebar.css";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);

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
              <p className="search-text">Notifications</p>
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
