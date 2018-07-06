import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Modal,
  AsyncStorage
} from "react-native";
import { Text, Title, ListItem } from "react-native-paper";

import axios from "axios";

class ViewOthersResponses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: []
    };
    this.getOtherUsersAnswers = this.getOtherUsersAnswers.bind(this);
  }

  static navigationOptions = {
    title: "Others Responses"
  };

  componentDidMount() {
    this.getOtherUsersAnswers();
  }

  getOtherUsersAnswers() {
    const token = AsyncStorage.getItem("token").then(value => {
      axios
        .get("http://10.201.233.38:8080/response", {
          params: { challengeId: 3 },
          headers: {
            Authorization: `Bearer ${value}`
          }
        })
        .then(response => {
          let responses = response.data;
          this.setState({ responses: responses });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  render() {
    const { visible } = this.state;
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
