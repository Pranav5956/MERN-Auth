import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeComponent from "../Pages/Home/Home";
import LoginComponent from "../Auth/Login/Login";
import RegisterComponent from "../Auth/Register/Register";

import HeaderComponent from "../Layout/Header/Header";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <HeaderComponent />
        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/register" component={RegisterComponent}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
