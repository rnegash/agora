import React, { Component } from "react";
import {
  AppRegistry,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  Headline,
  Text,
  TextInput,
  Button,
  BottomNavigation
} from "react-native-paper";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Toolbar>
          <ToolbarAction icon="menu" onPress={this._goBack} />
          <ToolbarContent title="Agora" />
          <ToolbarAction icon="more-vert" onPress={this._onMore} />
        </Toolbar>
        <View style={styles.challenge}>
          <Headline>Why do we dream?</Headline>
          <Text>Do you think that it is important for your daily life?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Useless Placeholder"
            value={this.state.text}
            multiline={true}
            onChangeText={text => this.setState({ text })}
          />
          <Button raised primary={true} onPress={() => console.log("Pressed")}>
            Answer
          </Button>
          <Button raised primary={true} onPress={() => console.log("Pressed")}>
            Login / Register
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  challenge: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  statement: {
    color: "#4A90E2",
    fontSize: 24,
    padding: 10,
    marginBottom: 10
  },
  question: {
    color: "#4A90E2",
    fontSize: 16,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20
  },
  textInput: {
    width: "100%",
    padding: 10,
    margin: 10
  }
});

AppRegistry.registerComponent("App", () => App);
