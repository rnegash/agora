import React, { Component } from "react";
import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Headline, Text, TextInput, Button } from "react-native-paper";

import { createStackNavigator } from "react-navigation";
import ViewOthersResponses from "./ViewOthersResponses.js";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: "",
      currentChallenge: 3
    };
  }
  static navigationOptions = {
    title: "Home"
  };

  onChangeText(e) {
    this.setState({ inputString: e.target.value });
  }

  onPress(e) {
    let userResponse = this.state.inputString;
    let challengeId = this.state.currentChallenge;
    console.log(userResponse, challengeId);

    this.postResponse(userResponse, challengeId);
    this.props.navigation.navigate("ViewOthersResponses");
  }

  postResponse(userResponse, challengeId) {
    axios
      .post("http://10.201.233.38:8080/response", {
        response: userResponse,
        challengeId: challengeId
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.challenge}>
          <Headline>Why do we dream?</Headline>
          <View>
            <Text>Do you think that it is important for your daily life?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="In my opinion..."
              value={this.state.inputString}
              multiline={true}
              onChangeText={inputString => this.setState({ inputString })}
            />
          </View>

          <Button raised primary={true} onPress={() => this.onPress()}>
            Answer
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  challenge: {
    flex: 1,
    justifyContent: "space-evenly",
    margin: 20
  },
  textInput: {
    width: "100%",
    padding: 0,
    margin: 0
  }
});
