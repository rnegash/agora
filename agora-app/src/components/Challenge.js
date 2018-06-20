import React, { Component } from "react";
import Quote from "./Quote.js";
import Response from "./Response.js";

class Challenge extends Component {
  render() {
    return (
      <section>
        <Quote
          quote="The unexamined life is not worth living"
          author="Socrates"
        />
        <Response
          question="Do you think that this is true?"
          search={this.props.search}
          onChange={this.props.onChange}
          searchQuery={this.props.searchQuery}
        />
      </section>
    );
  }
}
export default Challenge;
