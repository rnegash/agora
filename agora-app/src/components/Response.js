import React, { Component } from "react";

class Response extends Component {
  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          <label className="label">Do you think that this is true?</label>
          <textarea className="textarea" placeholder="e.g. Hello world" />
          <div className="level-right">
            <a className="button responseButton">Answer</a>
          </div>
        </div>
      </div>
    );
  }
}
export default Response;
