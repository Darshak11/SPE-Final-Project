// src/components/Login.js
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.js";

function Login({ onLoginSuccess, isLoggedIn }) {
  const navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userType, setUserType] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    console.log("Login clicked");
    try {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      const response = await axios.post(
        "http://localhost:8080/user/login",
        user
      );
      console.log(response.data);
      if (response.status == "200") {
        const userType = "auctioneer";
        onLoginSuccess();

        if (userType == "auctioneer") {
          navigate("/A_dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoginError("Login failed. Please check your username and password.");
      setTimeout(() => {
        setLoginError("");
      }, 3000);

      setTimeout(() => {
        password.current.value="";
        username.current.value="";
      }, 1000);
    }
  };

  if (loginSuccess && userType === "auctioneer") {
    navigate("A_dashboard");
    // return <Redirect to="/A_dashboard" />;
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div>
        <h2>Login</h2>
        {loginError && (
          <div class="alert alert-danger" role="alert">
            {loginError}
          </div>
        )}
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder="Username"
              // required
              ref={username}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Password"
              // required
              ref={password}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>

        {/* {loginError && <p>{loginError}</p>} */}
      </div>
    </>
  );
}

export default Login;
