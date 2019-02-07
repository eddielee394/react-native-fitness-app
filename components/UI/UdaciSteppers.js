import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Col, Grid, Text } from "native-base";

const UdaciSteppers = ({
  max,
  unit,
  step,
  value,
  onIncrement,
  onDecrement
}) => {
  return (
    <Grid style={{ justifyContent: "flex-end" }}>
      <Button onPress={onDecrement}>
        <FontAwesome name="minus" size={30} color={"white"} />
      </Button>
      <Button onPress={onIncrement}>
        <FontAwesome name="plus" size={30} color={"white"} />
      </Button>
      <Col>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </Col>
    </Grid>
  );
};

export default UdaciSteppers;
