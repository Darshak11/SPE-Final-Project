import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Auction App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
            </ul>
            {!isLoggedIn ? (
              <div className="d-flex">
                <Link to="/login" className="btn btn-outline-success" style={{ marginRight: '20px' }}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline-success">
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  onClick={() => {
                    onLogout();
                    navigate("/login");
                  }}
                  className="btn btn-outline-danger"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
