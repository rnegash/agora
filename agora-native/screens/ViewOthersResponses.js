import React, { Component } from "react";
import { Text, Title, ListItem } from "react-native-paper";
import { View, KeyboardAvoidingView, StyleSheet, FlatList } from "react-native";

class ViewOthersResponses extends Component {
  static navigationOptions = {
    title: "Others Responses"
  };

  render() {
    return (
      <View>
        <FlatList
          data={[
            { key: "a" },
            { key: "b" },
            { key: "baf" },
            { key: "bfa" },
            { key: "awf" },
            { key: "bf" },
            { key: "bfwaff" },
            { key: "bff" },
            { key: "aaf" },
            { key: "awfab" },
            { key: "bawf" },
            { key: "bawdf" }
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
