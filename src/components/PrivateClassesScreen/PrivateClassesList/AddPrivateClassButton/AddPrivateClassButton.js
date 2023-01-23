import React from "react";
import { FAB } from "react-native-paper";

import { theme } from "../../../../styles/theme";
import styles from "../../../../styles";

const AddPrivateClassButton = ({ onPress }) => (
  <FAB
    style={styles.fab}
    icon="plus"
    color={theme.colors.contrast}
    onPress={onPress}
  />
);

export default AddPrivateClassButton;
