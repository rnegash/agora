import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <div className="box">
            <form action="http://localhost:8080/access" method="post">
              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    placeholder="Your Email or Alias"
                    autoFocus=""
                    ref="username"
                    name="username"
                    id="username"
                    type="email"
                    defaultValue="birgit@hej.com"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    placeholder="Your Password"
                    ref="password"
                    name="password"
                    id="password"
                    type="password"
                    defaultValue="hejhejhej"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-primary is-medium is-fullwidth"
              >
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
