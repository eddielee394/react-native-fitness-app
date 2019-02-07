import React, { Component } from "react";
import Helpers from "../../utils/helpers";
import { UdaciSlider, UdaciSteppers, DateHeader, TextButton } from "../UI";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./store/actions";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardItem } from "native-base";

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = metric => {
    const { max, step } = Helpers.getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { step } = Helpers.getMetricMetaInfo(metric);

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
    const key = Helpers.timeToString();
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
    const key = Helpers.timeToString();

    this.props.addEntry({
      [key]: Helpers.getDailyReminderValue()
    });
    //todo navigate to home
    //todo save to db
  };

  render() {
    const metaInfo = Helpers.getMetricMetaInfo();
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="md-happy" size={100} />
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <Card>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <CardItem key={key}>
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
            </CardItem>
          );
        })}
        <TextButton onPress={this.submit}>Submit</TextButton>
      </Card>
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
  const key = Helpers.timeToString();

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
