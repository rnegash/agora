import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar-menu">
        <a className="navbar-item">Home</a>
        <a className="navbar-item">My past responses</a>
        <a className="navbar-item">Settings</a>
      </nav>
    );
  }
}
export default NavBar;
