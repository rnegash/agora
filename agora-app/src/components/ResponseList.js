import React, { Component } from "react";

import axios from "axios";

class ResponseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:8080/response")
      .then(response => {
        console.log(response.data);
        let responses = response.data;
        this.setState({ responses: responses });
      })
      .catch(error => {
        console.log(error);
      });
  }
  //          {this.state.responses.map(response => <p>{response.id}</p>)}

  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          {this.state.responses.map(response => (
            <div className="card" key={response.id}>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-6">user id - {response.userId}</p>
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
export default ResponseList;
