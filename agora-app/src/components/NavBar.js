import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar-menu">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <a className="navbar-item">My past responses</a>
        <a className="navbar-item">Settings</a>
        <Link to="/access" className="navbar-end navbar-item">
          Login / Register
        </Link>
      </nav>
    );
  }
}
export default NavBar;
