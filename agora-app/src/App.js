import React, { Component } from "react";
import Quote from "./components/Quote.js";
import NavBar from "./components/NavBar.js";
import Response from "./components/Response.js";

import axios from "axios";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
  componentWillMount() {
    this.getDailyQuote();
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

        <Quote
          quote="The unexamined life is not worth living"
          author="Socrates"
        />
        <Response />
      </section>
    );
  }
}

export default App;
