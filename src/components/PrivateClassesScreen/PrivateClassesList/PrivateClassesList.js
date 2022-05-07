import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Text, Card, Title, Paragraph } from "react-native-paper";

import AddPrivateClassButton from "./AddPrivateClassButton";
import NotFoundMessage from "../../NotFoundMessage";

import { getPrivateClasses } from "../../../sagas/selectors";
import styles from "../../../styles";

const PrivateClassesList = ({ navigation }) => {
  const privateClasses = useSelector(getPrivateClasses);

  const handleAddClass = () => {
    navigation.navigate("Create Private Class");
  };

  return (
    <View style={styles.container}>
      <AddPrivateClassButton onPress={handleAddClass} />
      <View style={styles.container}>
        {privateClasses.length === 0 && (
          <NotFoundMessage
            title={
              "There are no classes available for this subject, be the first to create one!"
            }
          />
        )}
        {privateClasses.map((cls) => (
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
    </View>
  );
};

export default PrivateClassesList;
