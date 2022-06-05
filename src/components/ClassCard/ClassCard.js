import React from "react";
import { useSelector } from "react-redux";
import { Card, Title, Paragraph } from "react-native-paper";

import { selectSubject } from "../../sagas/selectors";
import styles from "../../styles";

const ClassCard = ({ cls, onCardPress, isPrivate = false }) => {
  const subject = useSelector((state) => selectSubject(state, cls.subject));
  return (
    <Card onPress={() => onCardPress(cls.id)} style={styles.card}>
      <Card.Title title={subject.name} />
      <Card.Content>
        <Title>
          by {isPrivate ? cls.student?.fullName : cls.tutor?.fullName}
        </Title>
        <Paragraph>{cls.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ClassCard;
