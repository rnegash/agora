import React, { Component } from "react";
import { Text, Title, TextInput, Button } from "react-native-paper";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet
} from "react-native";

import axios from "axios";

class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "someone@cool.com",
      password: "hej",
      newUsername: "",
      newPassword: ""
    };
  }
  static navigationOptions = {
    title: "Login / Register"
  };
  componentDidMount() {
    axios
      .get("http://10.201.233.38:8080/access")
      .then(function(response) {
        console.log("get ", response);
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
          <Button
            raised
            primary={true}
            onPress={() => {
              console.log(this.state.username, this.state.password);
              axios
                .post("http://10.201.233.38:8080/access", {
                  auth: {
                    username: this.state.username,
                    password: this.state.password
                  },
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json"
                  }
                })
                .then(function(response) {
                  console.log(response);
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
          >
            Login
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
