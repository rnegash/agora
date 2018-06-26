import React, { Component } from "react";
import Statement from "./Statement.js";
import Response from "./Response.js";

class Challenge extends Component {
  render() {
    return (
      <section>
        <Statement
          statement="Is humanity headed in the right or wrong direction?"
          author=""
        />
        <Response
          question="Why do you think so? Give reasons for your answer."
          search={this.props.search}
          onChange={this.props.onChange}
          searchQuery={this.props.searchQuery}
        />
      </section>
    );
  }
}
export default Challenge;
