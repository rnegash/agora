import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar.js";
import Access from "./components/Access.js";
import TodaysChallenge from "./components/TodaysChallenge.js";
import ResponseList from "./components/ResponseList.js";

import axios from "axios";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: "",
      currentChallenge: 3
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    //this.setState({ userId: this.getLoggedInUserId() });
    axios
      .get("http://localhost:8080/access", { withCredentials: true })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClick(e) {
    let userResponse = this.state.inputString;
    let challengeId = this.state.currentChallenge;
    this.postResponse(userResponse, challengeId);
  }

  postResponse(userResponse, challengeId) {
    console.log(arguments);
    axios
      .post(
        "http://localhost:8080/response",
        {
          response: userResponse,
          challengeId: challengeId
        },
        { withCredentials: true }
      )
      .then(function(response) {
        //console.log(response);
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
                <TodaysChallenge
                  search={this.handleClick}
                  searchQuery={this.state.inputString}
                  onChange={this.handleChange}
                  challengeId={challengeId}
                />
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
