import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TextButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
