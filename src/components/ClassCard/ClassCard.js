import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Card } from "react-native-paper";

import AlignedText from "../AlignedText";
import StatusChip from "../StatusChip";

import { selectSubject } from "../../sagas/selectors";
import styles from "../../styles";
import { theme } from "../../styles/theme";

const ClassCard = ({ cls, onCardPress, isPrivate = false }) => {
  const subject = useSelector((state) => selectSubject(state, cls.subject));
  return (
    <Card onPress={() => onCardPress(cls.id)} style={styles.card}>
      <Card.Title
        title={subject?.name}
        titleVariant="titleLarge"
        style={localStyles.titleContainer}
        titleStyle={localStyles.titleText}
        left={() => <StatusChip status={cls.status} />}
        leftStyle={{ width: "auto" }}
      />
      <Card.Content>
        <AlignedText variant="titleLarge">
          من قبل:{isPrivate ? cls.student?.fullName : cls.tutor?.fullName}
        </AlignedText>
        <AlignedText variant="bodyMedium">{cls.description}</AlignedText>
      </Card.Content>
    </Card>
  );
};

const localStyles = StyleSheet.create({
  titleContainer: {
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness,
  },
  titleText: {
    color: theme.colors.contrast,
    textAlign: "right",
  },
});

export default ClassCard;
