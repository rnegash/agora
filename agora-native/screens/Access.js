import React, { Component } from "react";
import { Text, Title, TextInput } from "react-native-paper";
import { View, KeyboardAvoidingView, StyleSheet } from "react-native";

class Access extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  static navigationOptions = {
    title: "Login / Register"
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.section}>
          <Title>Login</Title>
          <TextInput
            label="Email"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput
            label="Password"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
        <View style={styles.section}>
          <Title>Register</Title>
          <TextInput
            label="Email"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput
            label="Password"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput
            label="Confirm password"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
      </KeyboardAvoidingView>
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
