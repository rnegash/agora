import React, { Component } from "react";
import { Text, Title, ListItem } from "react-native-paper";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  AsyncStorage
} from "react-native";

import axios from "axios";

class MyPastResponses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };
    this.getMyResponses = this.getMyResponses.bind(this);
  }
  static navigationOptions = {
    title: "My Responses"
  };

  componentDidMount() {
    this.getMyResponses();
  }

  getMyResponses() {
    const token = AsyncStorage.getItem("token").then(value => {
      console.log("this is here", value);

      axios
        .get("http://10.201.233.38:8080/response/user", {
          params: { challengeId: 3 },
          headers: {
            Authorization: `Bearer ${value}`
          }
        })
        .then(response => {
          let responses = response.data;
          this.setState({ responses: responses });
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.responses}
          renderItem={({ item }) => (
            <ListItem
              title={item.response}
              description={item.statement + " " + item.question}
            />
          )}
        />
      </View>
    );
  }
}

export default MyPastResponses;
