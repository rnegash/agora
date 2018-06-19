import React, { Component } from "react";
import Quote from "./components/Quote.js";
import NavBar from "./components/NavBar.js";
import Response from "./components/Response.js";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
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
