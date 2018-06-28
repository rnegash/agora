import React, { Component } from "react";

import axios from "axios";

class ResponseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: [],
      userNames: []
    };
  }

  componentDidMount() {
    this.getOtherUsersAnswers();
  }

  getOtherUsersAnswers() {
    axios
      .get("http://localhost:8080/response", {
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

  //not using atm
  getAliasForResponse(currentUserId) {
    axios
      .get("http://localhost:8080/alias", {
        params: { userId: currentUserId }
      })
      .then(response => {
        let userNames = response.data;
        this.setState({ userNames: userNames });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          <article className="message is-primary">
            <div className="message-header">
              <p>Success</p>
            </div>
            <div className="message-body">
              Your response has been stored and will be shared with other
              thinkers around the world. Thanks for your participation :)
            </div>
          </article>
          {this.state.responses.map(response => (
            <div className="card" key={response.id}>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-6">{response.alias}</p>
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
