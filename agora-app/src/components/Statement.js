import React, { Component } from "react";

class Statement extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container  has-text-centered">
            <blockquote>
              <h1 className="title">{this.props.statement}</h1>
              <footer>
                <cite>- {this.props.author}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    );
  }
}
export default Statement;
