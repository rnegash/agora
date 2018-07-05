import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar.js";
import Access from "./components/Access.js";
import TodaysChallenge from "./components/TodaysChallenge.js";
import ResponseList from "./components/ResponseList.js";
import MyPastResponses from "./components/MyPastResponses.js";

import axios from "axios";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    // TODO: currentChallenge should be rotated
    this.state = {
      inputString: "",
      currentChallenge: 3
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    let userResponse = this.state.inputString;
    let challengeId = this.state.currentChallenge;

    this.postResponse(userResponse, challengeId);
  }

  postResponse(userResponse, challengeId) {
    const token = localStorage.getItem("token");
    console.log("localStorage", token);

    axios({
      method: "post",
      url: "http://localhost:8080/response",
      data: {
        response: userResponse,
        challengeId: challengeId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ inputString: e.target.value });
  }

  render() {
    let challengeId = this.state.currentChallenge;
    return (
      <Router>
        <div className="container">
          <section>
            <NavBar />
          </section>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <TodaysChallenge
                    search={this.handleClick}
                    searchQuery={this.state.inputString}
                    onChange={this.handleChange}
                    challengeId={challengeId}
                  />
                </Fragment>
              )}
            />

            <Route
              exact
              path="/responses"
              render={props => (
                <ResponseList
                  {...props}
                  challengeId={challengeId}
                  currentUser={this.state.userId}
                />
              )}
            />
            <Route exact path="/access" render={props => <Access />} />
            <Route
              exact
              path="/my-past-responses"
              render={props => <MyPastResponses challengeId={challengeId} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
