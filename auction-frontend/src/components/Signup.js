// src/components/Signup.js
import './styles.css';
import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      phone: '',
      userType: 'auctioneer',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSignup = async () => {
    const { username, email, password, phone, userType } = this.state;

    // Make a POST request to your backend
    const user = { username, email, password, phone, userType };
    // Replace 'http://localhost:8080/user/signup' with your backend signup endpoint
    const response = await axios.post('http://localhost:8080/user/signup', user);
    console.log(response.data);

    // You may want to redirect the user after successful signup
    // For example, using React Router: this.props.history.push('/dashboard');
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
            Phone:
            <input
              type="tel"
              name="phone"
              value={this.state.phone}
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