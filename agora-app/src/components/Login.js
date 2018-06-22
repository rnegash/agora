import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <form>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    placeholder="Your Email or Alias"
                    autofocus=""
                    type="email"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    placeholder="Your Password"
                    type="password"
                  />
                </div>
              </div>
              <div className="field">
                <label className="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <button className="button is-block is-info is-large is-fullwidth">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
