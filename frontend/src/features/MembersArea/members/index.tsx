import { Route, Routes } from "react-router-dom";
import Sidebar from "../sidebar";
import Search from "./search";
import Explore from "./explore";
import Profile from "./profile/profile";
import Home from "./home";

export default function Members() {
  return (
    <div className="members-container">
      <Sidebar />
      <div className="members-wrapper">
        <Routes>
          <Route path="search" element={<Search />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
