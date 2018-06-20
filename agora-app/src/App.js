import React, { Component } from "react";
import NavBar from "./components/NavBar.js";
import Challenge from "./components/Challenge.js";

import axios from "axios";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
  componentWillMount() {
    //this.getDailyQuote();
  }

  getDailyQuote() {
    axios
      .get("http://quotes.rest/qod.json")
      .then(function(response) {
        console.log(response.data.contents.quotes[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <section>
        <NavBar />
        <Challenge />
      </section>
    );
  }
}

export default App;
