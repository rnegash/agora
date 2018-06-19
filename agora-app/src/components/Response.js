import React, { Component } from "react";

class Response extends Component {
  render() {
    return (
      <div className="columns has-text-centered">
        <div className="column  is-half  is-offset-one-quarter ">
          <textarea class="textarea" placeholder="e.g. Hello world" />
          <a className="button">Button</a>
        </div>
      </div>
    );
  }
}
export default Response;
