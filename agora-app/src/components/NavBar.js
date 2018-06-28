import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink to="/" className="navbar-item" activeClassName="is-active">
          Agora
        </NavLink>
        {document.cookie.length === 0 ? (
          <Fragment>
            <NavLink
              to="/access"
              className="navbar-end navbar-item"
              activeClassName="is-active"
            >
              Login / Register
            </NavLink>
          </Fragment>
        ) : (
          <Fragment>
            <NavLink
              to="/myPastResponses"
              className="navbar-item"
              activeClassName="is-active"
            >
              My past responses
            </NavLink>
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
