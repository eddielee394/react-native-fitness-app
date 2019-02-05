import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";

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
    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));
    //todo update redux
    //todo navigate to home
    //todo save to db
    //todo clear local notification
  };

  reset = () => {
    const key = timeToString();
    //todo update redux
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

export default AddEntry;
