import React from "react";
import { FAB } from "react-native-paper";

import styles from "../../../../styles";

const AddPrivateClassButton = ({ onPress }) => (
  <FAB style={styles.fab} icon="plus" onPress={onPress} />
);

export default AddPrivateClassButton;
