import React, { Component } from "react";
import Statement from "./Statement.js";
import Response from "./Response.js";

import axios from "axios";

class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/challenge", {
        params: { challengeId: 4 }
      })
      .then(response => {
        console.log(response.data);
        let challenge = response.data;
        this.setState({ challenge: challenge });
        console.log(challenge);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <section>
        <Statement
          statement={this.state.challenge.statement}
          author={this.state.challenge.author}
        />
        <Response
          question={this.state.challenge.question}
          search={this.props.search}
          onChange={this.props.onChange}
          searchQuery={this.props.searchQuery}
        />
      </section>
    );
  }
}
export default Challenge;
