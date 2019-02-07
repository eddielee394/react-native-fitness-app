import React from "react";
import { Slider, View, Text } from "react-native";

const UdaciSlider = ({ max, unit, step, value, onChange }) => {
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
      </View>
      <View>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};

export default UdaciSlider;
