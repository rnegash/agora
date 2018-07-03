import React, { Component } from "react";
import { Text, Title, ListItem } from "react-native-paper";
import { View, KeyboardAvoidingView, StyleSheet, FlatList } from "react-native";

import axios from "axios";

class ViewOthersResponses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };
  }
  static navigationOptions = {
    title: "Others Responses"
  };

  componentDidMount() {
    this.getOtherUsersAnswers();
  }

  getOtherUsersAnswers() {
    axios
      .get("http://10.201.233.38:8080/response", {
        params: { challengeId: 3 }
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
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.responses}
          renderItem={({ item }) => (
            <ListItem title={item.response} description={item.alias} />
          )}
        />
      </View>
    );
  }
}

export default ViewOthersResponses;
