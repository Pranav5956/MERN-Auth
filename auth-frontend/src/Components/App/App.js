import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import HomeComponent from "../Pages/Home/Home";
import LoginComponent from "../Auth/Login/Login";
import RegisterComponent from "../Auth/Register/Register";

import HeaderComponent from "../Layout/Header/Header";

import UserContext from "../../Context/UserContext";

import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenValidity = await axios.post(
        "http://localhost:5000/api/user/valid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (!tokenValidity.data.tokenValid) {
        return;
      }

      const userDataResponse = await axios.get(
        "http://localhost:5000/api/user/data",
        {
          headers: { "x-auth-token": token },
        }
      );
      setUserData({ token: token, user: userDataResponse.data.user });
    };
    checkLoggedIn();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <HeaderComponent />
          <Switch>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route exact path="/login" component={LoginComponent}></Route>
            <Route exact path="/register" component={RegisterComponent}></Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
