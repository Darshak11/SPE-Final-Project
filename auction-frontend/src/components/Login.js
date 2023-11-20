// src/components/Login.js
import './styles.css';
import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = async () => {
    const { username, password} = this.state;

    // Make a POST request to your backend
    const user = { username, password};
    // Replace '/api/login' with your backend login endpoint
    const response = await axios.post('http://localhost:8080/user/login', user);
    console.log(response.data);

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
          <button type="button" onClick={this.handleLogin}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
