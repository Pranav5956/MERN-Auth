import React from "react";
import { Link } from "react-router-dom";

import AuthOptionsComponent from "../../Auth/AuthOptions/AuthOptions";

import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__logo">TODO APP</h1>
      </Link>
      <AuthOptionsComponent />
    </header>
  );
}

export default Header;
