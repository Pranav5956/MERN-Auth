import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserContext from "../../../Context/UserContext";
import ErrorComponent from "../../Auth/ErrorDisplay/ErrorComponent";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };

      const loginResponse = await axios.post(
        "http://localhost:5000/api/user/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.error && setError(err.response.data.error);
    }
  };

  return (
    <div className="login">
      <h2 className="login__header">Login</h2>
      {error && (
        <ErrorComponent error={error} clearError={() => setError("")} />
      )}
      <form onSubmit={submit}>
        <label htmlFor="loginEmail" className="register__label">
          Email:{" "}
        </label>
        <input
          id="loginEmail"
          className="register__input"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="loginPassword" className="register__label">
          Password:{" "}
        </label>
        <input
          id="loginPassword"
          className="register__input"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" className="register__button" />
      </form>
    </div>
  );
}

export default Login;
