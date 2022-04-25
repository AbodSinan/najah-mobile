import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { getUserClasses, getUserType } from "../../../sagas/selectors";

import { Card, Title, Paragraph, Button, Text } from "react-native-paper";
import UserTypeEnum from "../../../enums/UserTypeEnum";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  const userType = useSelector(getUserType);

  return (
    <View>
      <View>
        {classes.length === 0 && (
          <Text>
            There are no classes available for this subject, be the first to
            create one!
          </Text>
        )}
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
      {userType === UserTypeEnum.TUTOR ? (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateClass")}
          title="CREATE CLASS"
        >
          Create Class
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("SearchClass")}
        >
          Search for a class
        </Button>
      )}
    </View>
  );
};

export default ClassesList;
