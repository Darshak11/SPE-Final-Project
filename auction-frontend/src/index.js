// src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';


const App = () => {
  const [authOption, setAuthOption] = useState(null);
  
  const handleLoginClick = () => {
    setAuthOption('login');
  };
  
  const handleSignupClick = () => {
    setAuthOption('signup');
  };

  return (
    <div>
      <div>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleSignupClick}>Sign Up</button>
      </div>
      {authOption === 'login' && <Login />}
      {authOption === 'signup' && <Signup />}
    </div>
  );
};

ReactDOM.render(
  <div className="container">
    <App />
  </div>,
  document.getElementById('root')
);

