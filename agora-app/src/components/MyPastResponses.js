import React, { Component } from "react";

import axios from "axios";

class MyPastResponses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };
  }

  componentDidMount() {
    this.getMyResponses();
  }

  getMyResponses() {
    axios
      .get("http://localhost:8080/response/user", {
        params: { challengeId: this.props.challengeId },
        withCredentials: true
      })
      .then(response => {
        let responses = response.data;
        this.setState({ responses: responses });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          {this.state.responses.map(response => (
            <div className="card" key={response.id}>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-6">
                      {response.statement} <br />
                      {response.question}
                    </p>
                  </div>
                </div>
                <div className="content">{response.response}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default MyPastResponses;
