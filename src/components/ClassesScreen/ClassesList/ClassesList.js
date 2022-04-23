import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { getUserClasses } from "../../../sagas/selectors";

import { Card, Title, Paragraph, Button } from "react-native-paper";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  return (
    <View>
      <View>
        {classes.map((cls) => (
          <Card>
            <Card.Title title={cls.subject} />
            <Card.Content>
              <Title>
                {cls.subject} by {cls.tutor}
              </Title>
              <Paragraph>{cls.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("CreateClass")}
        title="CREATE CLASS"
      />
    </View>
  );
};

export default ClassesList;
