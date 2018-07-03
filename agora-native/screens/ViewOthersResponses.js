import React, { Component } from "react";
import { Text, Title, ListItem } from "react-native-paper";
import { View, KeyboardAvoidingView, StyleSheet, FlatList } from "react-native";

class ViewOthersResponses extends Component {
  static navigationOptions = {
    title: "ViewOthersResponses"
  };

  render() {
    return (
      <View>
        <FlatList
          data={[
            { key: "a" },
            { key: "b" },
            { key: "b" },
            { key: "b" },
            { key: "a" },
            { key: "b" },
            { key: "b" },
            { key: "b" },
            { key: "a" },
            { key: "b" },
            { key: "b" },
            { key: "b" }
          ]}
          renderItem={({ item }) => (
            <ListItem title={item.key} description={item.key} />
          )}
        />
      </View>
    );
  }
}

export default ViewOthersResponses;
