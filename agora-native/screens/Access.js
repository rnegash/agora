import React, { Component } from "react";
import { Text, Title, TextInput, Button } from "react-native-paper";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from "react-native";

import axios from "axios";

class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "rufael@hej.com",
      password: "hejhej",
      newUsername: "",
      newPassword: ""
    };
    this.loginClick = this.loginClick.bind(this);
  }
  static navigationOptions = {
    title: "Login / Register"
  };

  loginClick(e) {
    axios
      .post("http://10.201.233.38:8080/access", {
        username: this.state.username,
        password: this.state.password
      })
      .then(async function(response) {
        const accessToken = response.data.token;

        await AsyncStorage.setItem("newtoken", accessToken);
        const asyncToken = await AsyncStorage.getItem("newtoken")
          .then(value => console.log(value))
          .done();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView behavior="padding" enabled>
        <KeyboardAvoidingView style={styles.section}>
          <Title>Login</Title>
          <TextInput
            label="Email"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button raised primary={true} onPress={this.loginClick}>
            Login
          </Button>
          <Button
            raised
            primary={true}
            onPress={() => AsyncStorage.removeItem("token")}
          >
            Logout
          </Button>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={styles.section}>
          <Title>Register</Title>
          <TextInput
            label="Email"
            value={this.state.newUsername}
            onChangeText={newUsername => this.setState({ newUsername })}
          />
          <TextInput
            label="Password"
            value={this.state.newPassword}
            onChangeText={newPassword => this.setState({ newPassword })}
          />
          <TextInput
            label="Confirm password"
            value={this.state.newPassword}
            onChangeText={newPassword => this.setState({ newPassword })}
          />
          <Button raised primary={true} onPress={() => this.onPress()}>
            Register
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  section: {
    margin: 20,
    justifyContent: "center",
    marginBottom: 0
  }
});
export default Access;
