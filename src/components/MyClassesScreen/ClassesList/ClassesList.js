import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Button, Text, Headline } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ClassCard from "../../ClassCard";

import {
  getUserClasses,
  getUserPrivateClasses,
} from "../../../sagas/selectors";
import classTypeEnum from "../../../enums/classTypeEnum";
import styles from "../../../styles";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  const privateClasses = useSelector(getUserPrivateClasses);
  const [classType, setClassType] = useState(classTypeEnum.ACADEMY);

  const handleClassPress = (classId) => {
    navigation.navigate("Class Info", {
      classId,
      isPrivate: classType == classTypeEnum.PRIVATE,
      ownClass: true,
    });
  };
  const handleSelectClassType = (selectedClassType) => {
    setClassType(selectedClassType);
  };

  return (
    <View>
      <View style={localStyles.buttonRow}>
        <Button
          style={localStyles.topButton}
          onPress={() => handleSelectClassType(classTypeEnum.ACADEMY)}
          mode={classType === classTypeEnum.ACADEMY ? "contained" : "outlined"}
        >
          Academy
        </Button>
        <Button
          style={localStyles.topButton}
          onPress={() => handleSelectClassType(classTypeEnum.PRIVATE)}
          mode={classType === classTypeEnum.PRIVATE ? "contained" : "outlined"}
        >
          Private
        </Button>
      </View>
      <View style={styles.container}>
        <View style={styles.container}>
          {classType === classTypeEnum.ACADEMY ? (
            <>
              <Headline>Academy Classes</Headline>
              {classes.map((cls) => (
                <ClassCard
                  cls={cls}
                  onCardPress={() => handleClassPress(cls.id)}
                />
              ))}
            </>
          ) : (
            <>
              <Headline>Private Classes</Headline>
              {privateClasses.map((cls) => (
                <ClassCard
                  cls={cls}
                  onCardPress={() => handleClassPress(cls.id)}
                  isPrivate
                />
              ))}
            </>
          )}
        </View>
        <View style={localStyles.buttonRow}>
          <Button
            mode="outlined"
            onPress={() =>
              navigation.navigate(
                classType == classTypeEnum.ACADEMY
                  ? "Create Class"
                  : "Create Private Class"
              )
            }
            title="CREATE CLASS"
            style={styles.iconButton}
          >
            <Icon name="plus" size={26} />
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Academy")}
            style={styles.iconButton}
          >
            <Icon name="magnify" size={26} />
          </Button>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  topButton: {
    flex: 1,
  },
});

export default ClassesList;
