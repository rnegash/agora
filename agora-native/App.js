import React, { Component } from "react";
import {
  AppRegistry,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import {
  Toolbar,
  ToolbarBackAction,
  ToolbarContent,
  ToolbarAction
} from "react-native-paper";
import { createBottomTabNavigator } from "react-navigation"; // 1.0.0-beta.27

import Home from "./screens/Home.js";
import Access from "./screens/Access.js";
import ViewOthersResponses from "./screens/ViewOthersResponses.js";
import MyPastResponses from "./screens/MyPastResponses.js";

import Icon from "react-native-vector-icons/Feather";
const headerIcon = <Icon name="triangle" size={25} color="#fff" />;
const tabIcon = <Icon name="triangle" size={25} color="#3498db" />;

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <ToolbarAction icon={headerIcon} />
          <ToolbarContent
            title="Agora"
            subtitle="Daily philosophy challenges"
          />
          <ToolbarAction icon="info" onPress={this._onMore} />
        </Toolbar>
        <MyNavigation />
      </View>
    );
  }
}
export default App;

const MyNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
    ViewOthersResponses: {
      screen: ViewOthersResponses
    },
    MyPastResponses: {
      screen: MyPastResponses
    },
    Access: {
      screen: Access
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      tabBarIcon: () => {
        return tabIcon;
      },
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent("App", () => App);
