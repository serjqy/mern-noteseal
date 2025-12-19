import { Archive, Feather, Home } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import SidebarTags from "./SidebarTags";

const Sidebar = () => {
  return (
    <aside className="aside">
      <div className="aside__logo">
        <Link to="/" href="/" className="icon-wrapper">
          <Feather />
          <span>NoteSeal</span>
        </Link>
      </div>
      <div className="aside__menu">
        <Link to="/" className="btn btn-secondary icon-wrapper">
          <Home /> All Notes
        </Link>
        <Link to="/archived" className="btn btn-secondary icon-wrapper">
          <Archive />
          Archived
        </Link>
      </div>
      <SidebarTags />
    </aside>
  );
};

export default Sidebar;
