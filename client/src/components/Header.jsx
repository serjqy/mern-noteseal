import { Search } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  const title = pathname === "/archived" ? "Archived Notes" : "All Notes";

  return (
    <header className="header">
      <h2 className="header__title">{title}</h2>

      <div className="header__menu">
        <div className="header__search icon-wrapper">
          <Search />
          <input
            type="text"
            placeholder="Search by Title, Content or Tags"
            className="searchBar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
