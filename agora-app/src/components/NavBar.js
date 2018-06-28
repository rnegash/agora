import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        {document.cookie.length === 0 ? (
          <Fragment>
            <Link to="/access" className="navbar-end navbar-item">
              Login / Register
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/myPastResponses" className="navbar-item">
              My past responses
            </Link>
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
