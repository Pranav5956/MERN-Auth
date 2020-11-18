import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../../../Context/UserContext";

import "./AuthOptions.css";

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="authOptions">
      {userData.user ? (
        <button className="authOptions__option" onClick={logout}>
          Log Out
        </button>
      ) : (
        <React.Fragment>
          <button className="authOptions__option" onClick={register}>
            Register
          </button>
          <button className="authOptions__option" onClick={login}>
            Login
          </button>
        </React.Fragment>
      )}
    </nav>
  );
}

export default AuthOptions;
