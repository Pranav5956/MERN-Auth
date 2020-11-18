import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserContext from "../../../Context/UserContext";
import ErrorComponent from "../../Auth/ErrorDisplay/ErrorComponent";

import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await axios.post("http://localhost:5000/api/user/register", newUser);

      const loginResponse = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password }
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
    <div className="register">
      <h2 className="register__header">Register</h2>
      {error && (
        <ErrorComponent error={error} clearError={() => setError("")} />
      )}
      <form onSubmit={submit}>
        <label htmlFor="registerEmail" className="register__label">
          Email:
        </label>
        <input
          id="registerEmail"
          className="register__input"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="registerPassword" className="register__label">
          Password:
        </label>
        <input
          id="registerPassword"
          className="register__input"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="registerConfirmPassword" className="register__label">
          Confirm Password:
        </label>
        <input
          id="registerConfirmPassword"
          className="register__input"
          type="password"
          placeholder="Enter password again"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="registerDisplayName" className="register__label">
          Display Name:
        </label>
        <input
          id="registerDisplayName"
          className="register__input"
          type="text"
          placeholder="Enter display name"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" className="register__button" value="Register" />
      </form>
    </div>
  );
}

export default Register;
