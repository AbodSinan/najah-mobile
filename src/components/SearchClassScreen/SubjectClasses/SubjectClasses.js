import React from "react";
import { ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectSubjectClasses } from "../../../sagas/selectors";
import styles from "../../../styles";
import ClassCard from "../../ClassCard";

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
        <ClassCard
          onCardPress={() => handleClassPress(cls.id)}
          style={styles.card}
        />
      ))}
    </ScrollView>
  );
};

export default SubjectClasses;
