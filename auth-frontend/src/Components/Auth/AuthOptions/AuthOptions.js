import React from "react";
import { useHistory } from "react-router-dom";

import "./AuthOptions.css";

function AuthOptions() {
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");

  return (
    <nav className="authOptions">
      <button className="authOptions__option" onClick={register}>
        Register
      </button>
      <button className="authOptions__option" onClick={login}>
        Login
      </button>
    </nav>
  );
}

export default AuthOptions;
