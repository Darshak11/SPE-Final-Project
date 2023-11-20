// src/components/Signup.js
import React, { Component } from 'react';
import './styles.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      userType: 'auctioneer',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSignup = () => {
    const { username, email, password, userType } = this.state;
    console.log(`Signing up as ${userType}: ${username}, ${email}`);
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
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
            Email:
            <input
              type="email"
              name="email"
              value={this.state.email}
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
          <button type="button" onClick={this.handleSignup}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
  
export default Signup;
