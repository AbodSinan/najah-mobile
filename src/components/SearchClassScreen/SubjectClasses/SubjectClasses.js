import React from "react";
import { ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectSubjectClasses } from "../../../sagas/selectors";
import styles from "../../../styles";

const SubjectClasses = ({ navigation, route }) => {
  const { subject } = route.params || null;

  const classes = useSelector((state) =>
    selectSubjectClasses(state, subject.id)
  );

  const handleClassPress = (classId) => {
    navigation.navigate("Class Info", { classId });
  };

  return (
    <ScrollView style={styles.container}>
      {classes.map((cls) => (
        <Card onPress={() => handleClassPress(cls.id)} style={styles.card}>
          <Card.Title title={subject.name} />
          <Card.Content>
            <Title>By {cls.tutor.firstName}</Title>
            <Paragraph>{cls.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default SubjectClasses;
