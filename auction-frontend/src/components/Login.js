// src/components/Login.js
import './styles.css';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      userType: 'auctioneer', // Default user type
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = () => {
    const { username, password, userType } = this.state;

    // You can implement authentication logic here
    // For simplicity, let's just log the user info for now
    console.log(`Logging in as ${userType}: ${username}`);

    // You may want to redirect the user after successful login
    // For example, using React Router: this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            User Type:
            <select
              name="userType"
              value={this.state.userType}
              onChange={this.handleInputChange}
            >
              <option value="auctioneer">Auctioneer</option>
              <option value="player">Player</option>
              <option value="owner">Owner</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={this.handleLogin}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
