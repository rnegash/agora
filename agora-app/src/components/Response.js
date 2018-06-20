import React, { Component } from "react";

class Response extends Component {
  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          <label className="label">Do you think that this is true?</label>
          <textarea
            className="textarea"
            placeholder="e.g. Hello world"
            onChange={this.props.onChange}
            value={this.props.searchQuery}
          />
          <div className="level-right">
            <a className="button responseButton" onClick={this.props.search}>
              Answer
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Response;
