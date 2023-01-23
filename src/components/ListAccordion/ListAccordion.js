import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { theme } from "../../styles/theme";

const ListAccordion = ({ children, icon, ...otherProps }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <List.Accordion
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      style={styles.accordionButton}
      titleStyle={styles.description}
      left={(props) => (
        <List.Icon
          {...props}
          icon={() => <Icon name={icon} color="white" size={26} solid />}
        />
      )}
      {...otherProps}
    >
      {children}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  accordionButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.contrast,
    borderRadius: theme.roundness,
    marginBottom: "5px",
  },
  description: {
    color: theme.colors.contrast,
  },
});

export default ListAccordion;
