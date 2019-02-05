import React from "react";
import { StyleSheet, View } from "react-native";
import { AddEntry } from "./components/Entries";
import { Provider } from "react-redux";
import store from "./store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
