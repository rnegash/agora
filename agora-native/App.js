import React, { Component } from "react";
import {
  AppRegistry,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { createBottomTabNavigator } from "react-navigation"; // 1.0.0-beta.27

import Home from "./screens/Home.js";
import Access from "./screens/Access.js";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyNavigation />
      </View>
    );
  }
}
export default App;

const MyNavigation = createBottomTabNavigator({
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
  }
});

AppRegistry.registerComponent("App", () => App);
