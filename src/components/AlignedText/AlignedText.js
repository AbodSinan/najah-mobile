import React from "react";
import { Text } from "react-native-paper";

const AlignedText = (props) => (
  <Text {...props} style={[props.style, { textAlign: "right" }]} />
);

export default AlignedText;
