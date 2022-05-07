import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import {
  getUserClasses,
  getUserType,
  getUserPrivateClasses,
} from "../../../sagas/selectors";

import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Headline,
} from "react-native-paper";
import UserTypeEnum from "../../../enums/UserTypeEnum";
import styles from "../../../styles";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  const privateClasses = useSelector(getUserPrivateClasses);
  const userType = useSelector(getUserType);

  const handleClassPress = (classId) => {
    navigation.navigate("Class Info", { classId });
  };

  const handlePrivateClassPress = (classId) => {
    navigation.navigate("Class Info", { classId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {classes.length === 0 && (
          <Text>
            There are no classes available for this subject, be the first to
            create one!
          </Text>
        )}
        <Headline>Academy Classes</Headline>
        {classes.map((cls) => (
          <Card onPress={() => handleClassPress(cls.id)} style={styles.card}>
            <Card.Title title={cls.subject} />
            <Card.Content>
              <Title>
                {cls.subject} by {cls.tutor.firstName} {cls.tutor.lastName}
              </Title>
              <Paragraph>{cls.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
        <Headline>Private Classes</Headline>
        {privateClasses.map((cls) => (
          <Card
            onPress={() => handlePrivateClassPress(cls.id)}
            style={styles.card}
          >
            <Card.Title title={cls.subject} />
            <Card.Content>
              <Title>
                {cls.subject} by {cls.student.firstName} {cls.student.lastName}
              </Title>
              <Paragraph>{cls.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
      {userType === UserTypeEnum.TUTOR ? (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Create Class")}
          title="CREATE CLASS"
          style={styles.actionbutton}
        >
          Create Class
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Academy")}
          style={styles.actionbutton}
        >
          Search for a class
        </Button>
      )}
    </View>
  );
};

export default ClassesList;
