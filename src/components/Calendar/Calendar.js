import React, { Component } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { connect } from "react-redux";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { Card, CardItem, Icon, Right, Text, Button } from "native-base";
import { DateHeader } from "../../components/UI";
import { Helpers } from "../../utils";

class Calendar extends Component {
  componentDidMount() {
    this.props.getCalendarResults(this.props.entries);
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <Card>
      <CardItem header>
        <DateHeader date={formattedDate} />
      </CardItem>
      {today ? (
        <CardItem button onPress={() => console.log("metric card onPress()")}>
          <Icon active name="calendar" />
          <Text>{today}</Text>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      ) : (
        Object.keys(metrics).map(metric => {
          const {
            getIcon,
            displayName,
            unit,
            backgroundColor
          } = Helpers.getMetricMetaInfo(metric);
          return (
            <CardItem
              button
              onPress={() => console.log("metric card onPress()")}
              key={metric}
            >
              <Button style={{ backgroundColor, marginRight: 15 }}>
                {getIcon()}
              </Button>
              <Text>{displayName}</Text>
              <Right>
                <Text>
                  {metrics[metric]} {unit}
                </Text>
              </Right>
            </CardItem>
          );
        })
      )}
    </Card>
  );

  renderEmptyDate = formattedDate => (
    <Card>
      <CardItem header>
        <DateHeader date={formattedDate} />
      </CardItem>
      <CardItem>
        <Text>No Data for This Day</Text>
      </CardItem>
    </Card>
  );

  render() {
    const { entries } = this.props;

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
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
  return {
    entries: entries.data
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
