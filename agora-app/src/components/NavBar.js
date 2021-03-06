import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.logoutClick = this.logoutClick.bind(this);
  }

  logoutClick() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  render() {
    return (
      <nav className="navbar">
        <NavLink
          to="/"
          className="navbar-item logo"
          activeClassName="is-active"
        >
          Agora
        </NavLink>
        {localStorage.getItem("token") === null ? (
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
              to="/my-past-responses"
              className="navbar-item"
              activeClassName="is-active"
            >
              My past responses
            </NavLink>
            <a onClick={this.logoutClick} className="navbar-end navbar-item">
              Logout
            </a>
          </Fragment>
        )}
      </nav>
    );
  }
}
export default NavBar;
