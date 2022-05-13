import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Button, Text, Headline } from "react-native-paper";

import ClassCard from "../../ClassCard";

import {
  getUserClasses,
  getUserType,
  getUserPrivateClasses,
} from "../../../sagas/selectors";
import UserTypeEnum from "../../../enums/UserTypeEnum";
import styles from "../../../styles";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  const privateClasses = useSelector(getUserPrivateClasses);
  const userType = useSelector(getUserType);

  const handleClassPress = (classId) => {
    navigation.navigate("Class Info", {
      classId,
      isPrivate: false,
      ownClass: true,
    });
  };

  const handlePrivateClassPress = (classId) => {
    navigation.navigate("Class Info", {
      classId,
      isPrivate: true,
      ownClass: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {classes.length > 0 && <Headline>Academy Classes</Headline>}
        {classes.map((cls) => (
          <ClassCard cls={cls} onCardPress={() => handleClassPress(cls.id)} />
        ))}
        <Headline>Private Classes</Headline>
        {privateClasses.map((cls) => (
          <ClassCard
            cls={cls}
            onCardPress={() => handlePrivateClassPress(cls.id)}
            isPrivate
          />
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
