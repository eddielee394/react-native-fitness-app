import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  getDailyReminderValue,
  getMetricMetaInfo,
  timeToString
} from "../../utils/helpers";
import { UdaciSlider, UdaciSteppers, DateHeader, TextButton } from "../UI";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./store/actions";
import { Ionicons } from "@expo/vector-icons";

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] - step;
      return {
        ...state,
        [metric]: count > 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.addEntry({ [key]: entry });

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));

    //todo navigate to home
    //todo clear local notification
  };

  reset = () => {
    const key = timeToString();

    this.props.addEntry({
      [key]: getDailyReminderValue()
    });
    //todo navigate to home
    //todo save to db
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="md-happy" size={100} />
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              )}
            </View>
          );
        })}
        <TextButton onPress={this.submit}>Submit</TextButton>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEntries: Actions.getEntries,
      addEntry: Actions.addEntry
    },
    dispatch
  );
}

function mapStateToProps({ entries }) {
  const key = timeToString();

  return {
    entries: entries.data,
    alreadyLogged:
      entries.data[key] && typeof entries.data[key].today === "undefined"
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEntry);
