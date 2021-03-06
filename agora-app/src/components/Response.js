import React, { Component } from "react";
import { Link } from "react-router-dom";

class Response extends Component {
  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          <label className="label">{this.props.question}</label>
          <textarea
            className="textarea"
            rows="10"
            placeholder="In my opinion..."
            onChange={this.props.onChange}
            value={this.props.searchQuery}
          />
          <div className="level-right">
            <Link
              to="/responses"
              className="button is-outlined responseButton"
              onClick={this.props.search}
            >
              Answer
            </Link>
          </div>
          <div className="level-right">
            <p>and see other responses...</p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default Response;
