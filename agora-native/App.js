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

import { createDrawerNavigator } from "react-navigation"; // 1.0.0-beta.27

import Home from "./screens/Home.js";
import Access from "./screens/Access.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  render() {
    return (
      <View style={styles.container}>
        <MyNavigation />
      </View>
    );
  }
}
export default App;

const MyNavigation = createDrawerNavigator({
  Home: {
    screen: Home
  },
  Access: {
    screen: Access
  }
});

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
