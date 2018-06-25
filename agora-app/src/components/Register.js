import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Register</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <form action="http://localhost:8080/register" method="post">
              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    placeholder="Your Email"
                    autoFocus=""
                    name="username"
                    id="username"
                    type="email"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    placeholder="Your Password"
                    name="password"
                    id="password"
                    type="password"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-large"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>
              </div>

              <button className="button is-block is-info is-large is-fullwidth">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
