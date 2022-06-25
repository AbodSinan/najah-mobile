import React, { useState } from "react";
import { List } from "react-native-paper";

const ListAccordion = ({ children, ...otherProps }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <List.Accordion
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      {...otherProps}
    >
      {children}
    </List.Accordion>
  );
};

export default ListAccordion;
