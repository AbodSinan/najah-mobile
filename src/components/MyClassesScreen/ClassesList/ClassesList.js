import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AlignedText from "../../AlignedText";
import ClassCard from "../../ClassCard";

import {
  getUserClasses,
  getUserPrivateClasses,
} from "../../../sagas/selectors";
import classTypeEnum from "../../../enums/classTypeEnum";
import styles from "../../../styles";
import { theme } from "../../../styles/theme";

const ClassesList = ({ navigation }) => {
  const classes = useSelector(getUserClasses);
  const privateClasses = useSelector(getUserPrivateClasses);
  const [classType, setClassType] = useState(classTypeEnum.ACADEMY);

  const handleClassPress = (classId) => {
    navigation.navigate("Class Info", {
      classId,
      isPrivate: classType == classTypeEnum.PRIVATE,
      isOwnClass: true,
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
          <AlignedText
            variant="titleLarge"
            style={{
              color:
                classType === classTypeEnum.ACADEMY
                  ? theme.colors.contrast
                  : theme.colors.primary,
            }}
          >
            محاضراتي
          </AlignedText>
        </Button>
        <Button
          style={localStyles.topButton}
          onPress={() => handleSelectClassType(classTypeEnum.PRIVATE)}
          mode={classType === classTypeEnum.PRIVATE ? "contained" : "outlined"}
        >
          <AlignedText
            variant="titleLarge"
            style={{
              color:
                classType === classTypeEnum.PRIVATE
                  ? theme.colors.contrast
                  : theme.colors.primary,
            }}
          >
            دروسي الخصوصية
          </AlignedText>
        </Button>
      </View>
      <View style={styles.container}>
        <View>
          {classType === classTypeEnum.ACADEMY ? (
            <>
              <View style={styles.bottomPadded}>
                <AlignedText variant="headlineMedium">محاضراتي</AlignedText>
              </View>
              {classes.map((cls) => (
                <ClassCard
                  key={cls.id}
                  cls={cls}
                  onCardPress={() => handleClassPress(cls.id)}
                />
              ))}
            </>
          ) : (
            <>
              <View style={styles.bottomPadded}>
                <AlignedText variant="headlineMedium">
                  دروسي الخصوصية
                </AlignedText>
              </View>
              {privateClasses.map((cls) => (
                <ClassCard
                  key={cls.id}
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
            mode="contained"
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
            <Icon name="plus" size={30} />
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Academy")}
            style={styles.iconButton}
          >
            <Icon name="magnify" size={30} />
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
    justifyContent: "center",
  },
  topButton: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 0,
    height: 70,
  },
});

export default ClassesList;
