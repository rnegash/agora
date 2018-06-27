import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar-menu">
        <Link to="/" className="navbar-item">
          Home
        </Link>

        {document.cookie.length === 0 ? (
          <Link to="/access" className="navbar-end navbar-item">
            Login / Register
          </Link>
        ) : (
          <Fragment>
            <a className="navbar-item">My past responses</a>
            <a className="navbar-item">Settings</a>
            <a
              href="http://localhost:8080/logout"
              className="navbar-end navbar-item"
            >
              Logout
            </a>
          </Fragment>
        )}
      </nav>
    );
  }
}
export default NavBar;
