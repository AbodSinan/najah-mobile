import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../styles/theme";
import AlignedText from "../AlignedText";

const statusMapping = {
  P: {
    text: "Pending Registration",
    color: "#2E6FD9",
  },
  T: {
    text: "Pending Tutor",
    color: "#2E6FD9",
  },
  S: {
    text: "Ongoing",
    color: "#1FC06F",
  },
  E: {
    text: "Ended",
    color: "#E05B2B",
  },
  C: {
    text: "Cancelled",
    color: "#DB2929",
  },
};

const StatusChip = ({ status }) => {
  return (
    <View
      type="outlined"
      style={[
        localStyle.chipContainer,
        { backgroundColor: statusMapping[status]?.color },
      ]}
    >
      <AlignedText
        style={{ color: theme.colors.contrast }}
        variant="bodyMedium"
      >
        {statusMapping[status]?.text}
      </AlignedText>
    </View>
  );
};

const localStyle = StyleSheet.create({
  chipContainer: {
    display: "flex",
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.roundness,
  },
});

export default StatusChip;
