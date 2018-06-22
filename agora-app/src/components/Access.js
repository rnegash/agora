import React, { Component } from "react";
import Login from "./Login.js";
import Register from "./Register.js";

class Access extends Component {
  render() {
    return (
      <section>
        <Login />
        <Register />
      </section>
    );
  }
}
export default Access;
