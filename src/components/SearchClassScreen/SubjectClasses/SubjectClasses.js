import React from "react";
import { ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectSubjectClasses } from "../../../sagas/selectors";

const SubjectClasses = ({ navigation, route }) => {
  const { subjectId } = route.params || null;
  console.log(route);
  const classes = useSelector((state) =>
    selectSubjectClasses(state, subjectId)
  );
  console.log(classes);

  const handleClassPress = (classId) => {
    navigation.navigate("ClassInfo", { classId });
  };

  return (
    <ScrollView>
      {classes.map((cls) => (
        <Card onPress={() => handleClassPress(cls.id)}>
          <Card.Title title={cls.name} />
          <Card.Content>
            <Title>{cls.subject.name}</Title>
            <Paragraph>{cls.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default SubjectClasses;
