import React from "react";

import { Chip } from "react-native-paper";

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
  console.log(status);
  return (
    <Chip
      type="outlined"
      style={{ backgroundColor: statusMapping[status]?.color, marginRight: 6 }}
    >
      {" "}
      {statusMapping[status]?.text}{" "}
    </Chip>
  );
};

export default StatusChip;
