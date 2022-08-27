import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";

import AddPrivateClassButton from "./AddPrivateClassButton";
import NotFoundMessage from "../../NotFoundMessage";

import { getPrivateClasses } from "../../../sagas/selectors";
import styles from "../../../styles";
import ClassCard from "../../ClassCard/ClassCard";

const PrivateClassesList = ({ navigation }) => {
  const privateClasses = useSelector(getPrivateClasses);

  const handleAddClass = () => {
    navigation.navigate("Create Private Class");
  };

  const handlePrivateClassPress = (classId) => {
    navigation.navigate("Class Info", { classId, isPrivate: true });
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
          <ClassCard
            key={cls.id}
            cls={cls}
            onCardPress={handlePrivateClassPress}
            isPrivate
          />
        ))}
      </View>
    </View>
  );
};

export default PrivateClassesList;
