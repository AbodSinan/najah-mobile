import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Card, Title, Paragraph } from "react-native-paper";

import StatusChip from "../StatusChip";

import { selectSubject } from "../../sagas/selectors";
import styles from "../../styles";
import { theme } from "../../styles/theme";

const ClassCard = ({ cls, onCardPress, isPrivate = false }) => {
  const subject = useSelector((state) => selectSubject(state, cls.subject));
  return (
    <Card onPress={() => onCardPress(cls.id)} style={styles.card}>
      <Card.Title
        title={subject.name}
        style={localStyles.titleContainer}
        titleStyle={localStyles.titleText}
        right={() => <StatusChip status={cls.status} />}
      />
      <Card.Content>
        <Title>
          by {isPrivate ? cls.student?.fullName : cls.tutor?.fullName}
        </Title>
        <Paragraph>{cls.description}</Paragraph>
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
  },
});

export default ClassCard;
