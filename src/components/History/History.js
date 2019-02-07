import React, { Component } from "react";
import { View, Text } from "react-native";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { connect } from "react-redux";

class History extends Component {
  render() {
    return (
      <View>
        <Text>History</Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCalendarResults: Actions.getCalendarResults
    },
    dispatch
  );
}

function mapStateToProps({ entries }) {
  //do logic

  //pass from store to component
  return {
    entries
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
