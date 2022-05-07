import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { getUserClasses, getUserType } from "../../../sagas/selectors";

import { Card, Title, Paragraph, Button, Text } from "react-native-paper";
import UserTypeEnum from "../../../enums/UserTypeEnum";
import styles from "../../../styles";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  const userType = useSelector(getUserType);

  const handleClassPress = (classId) => {
    navigation.navigate("ClassInfo", { classId });
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
      </View>
      {userType === UserTypeEnum.TUTOR ? (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateClass")}
          title="CREATE CLASS"
          style={styles.actionbutton}
        >
          Create Class
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("SearchClass")}
          style={styles.actionbutton}
        >
          Search for a class
        </Button>
      )}
    </View>
  );
};

export default ClassesList;
