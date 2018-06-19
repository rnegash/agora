import React, { Component } from "react";

class Quote extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container  has-text-centered">
            <blockquote>
              <h1 className="title">
                The unexamined life is not worth living{" "}
              </h1>
              <footer>
                <cite>Socrates</cite>
              </footer>
            </blockquote>
          </div>

          <div className="container question">
            <p className="has-text-centered">Do you think that this is true?</p>
          </div>
        </div>
      </section>
    );
  }
}
export default Quote;
