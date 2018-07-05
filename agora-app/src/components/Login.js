import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "birgit@hej.com",
      password: "hejhejhej",
      newUsername: "",
      newPassword: ""
    };
    this.loginClick = this.loginClick.bind(this);
  }
  loginClick(e) {
    e.preventDefault(); // NOTE: This prohibited cors issues??
    axios
      .post("http://localhost:8080/access", {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        const accessToken = response.data.token;
        localStorage.setItem("token", accessToken);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <div className="box">
            <form>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    placeholder="Your Email or Alias"
                    autoFocus=""
                    ref="username"
                    name="username"
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
                    type="password"
                    defaultValue="hejhejhej"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-primary is-medium is-fullwidth"
                onClick={this.loginClick}
              >
                Login
              </button>
              <a
                type="submit"
                className="button is-block is-primary is-medium is-fullwidth"
                href="http://localhost:8080/user"
              >
                protected page
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
