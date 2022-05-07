import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";

import Icon from "react-native-vector-icons/FontAwesome5";
import { theme } from "../../styles/theme";

const NotFoundMessage = ({ title }) => (
  <View style={localStyles.container}>
    <Icon name="sad-tear" size={50} style={localStyles.text} />
    <Headline style={localStyles.text}>{title}</Headline>
  </View>
);

const localStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    padding: 50,
  },
  text: {
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export default NotFoundMessage;
