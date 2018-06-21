import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar.js";
import Challenge from "./components/Challenge.js";
import ResponseList from "./components/ResponseList.js";

import axios from "axios";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    let userResponse = this.state.inputString;
    axios
      .post("http://localhost:8080/response", {
        response: userResponse
      })
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
                <Challenge
                  search={this.handleClick}
                  searchQuery={this.state.inputString}
                  onChange={this.handleChange}
                />
              )}
            />
            <Route
              exact
              path="/responses/"
              render={props => <ResponseList />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
