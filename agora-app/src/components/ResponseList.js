import React, { Component } from "react";

class ResponseList extends Component {
  componentWillMount() {
    // axios
    //   .get("http://localhost:8080/data/response")
    //   .then(function(response) {
    //     console.log(response.data);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }
  render() {
    return (
      <div className="columns is-centered">
        <div className="column  is-half is-narrow ">
          <p>these arethe other responsess</p>
        </div>
      </div>
    );
  }
}
export default ResponseList;
