import React, { Component } from "react";
import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Headline, Text, TextInput, Button } from "react-native-paper";

import { createStackNavigator } from "react-navigation";
import ViewOthersResponses from "./ViewOthersResponses.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  static navigationOptions = {
    title: "Home"
  };

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
              value={this.state.text}
              multiline={true}
              onChangeText={text => this.setState({ text })}
            />
          </View>

          <Button
            raised
            primary={true}
            onPress={() =>
              this.props.navigation.navigate("ViewOthersResponses")
            }
          >
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
