// src/components/Signup.js
import React, { useRef, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar.js";
import { useNavigate } from "react-router-dom";

export const Signup = ({ onLoginSuccess, isLoggedIn }) => {
  const navigate = useNavigate();
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const phone = useRef("");
  const userType = useRef("");
  const [SigninError, setSigninError] = useState("");
  const SigninSuccess = useRef("");

  const handleSignup = async () => {
    console.log(username.current.value, password.current.value);
    try {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      const response = await axios.post(
        "http://localhost:8080/user/signup",
        user
      );
      console.log(response.data);
      if (response.status == "200") {
        setSigninError(true);
      }
      navigate("/login");
    } catch (error) {
      console.error("Signin failed:", error.message);
      setSigninError(
        "Signin failed. Please check your username and password and try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <h2>Sign Up</h2>
        <form>
          <label>
            Username:
            <input type="text" name="username" ref={username} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" ref={email} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" ref={password} />
          </label>
          <br />
          <label>
            Phone:
            <input type="tel" name="phone" ref={phone} />
          </label>
          <br />
          <label>
            User Type:
            <select name="userType" ref={userType}>
              <option value="auctioneer">Auctioneer</option>
              <option value="player">Player</option>
              <option value="owner">Owner</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </form>
        {SigninError && <p>{SigninError}</p>}
      </div>
    </>
  );
};

export default Signup;
