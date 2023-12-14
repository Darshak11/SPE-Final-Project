import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import A_dashboard from "./components/A_dashboard.js";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const [authOption, setAuthOption] = useState(null);
  // const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable

  const handleLoginClick = () => {
    setAuthOption("login");
  };

  const handleSignupClick = () => {
    setAuthOption("signup");
  };

  const handleLoginSuccess = () => {
    // New handler for login success
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    // New handler for login success
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <div className="content">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <Login
                  onLoginSuccess={handleLoginSuccess}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  onLoginSuccess={handleLoginSuccess}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/A_dashboard"
              element={
                <A_dashboard onLogout={handleLogout} isLoggedIn={isLoggedIn} />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
