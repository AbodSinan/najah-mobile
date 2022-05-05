import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {
  getEducationLevels,
  getSubjectCategories,
  getSubjects,
} from "../../../sagas/selectors";
import { extractLabelList, filterSubjects } from "../../../utils/commonUtils";

import styles from "../../../styles";

const SearchSubject = ({ navigation }) => {
  const educationLevels = useSelector(getEducationLevels);
  const subjectCategories = useSelector(getSubjectCategories);
  const subjects = useSelector(getSubjects);

  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

  const [showSubjectCategoryDropdown, setShowSubjectCategoryDropdown] =
    useState(false);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);

  const filteredSubjects = filterSubjects({
    subjects,
    subjectCategoryIds: selectedSubjectCategory
      ? [selectedSubjectCategory]
      : null,
    educationLevelIds: selectedEducationLevel ? [selectedEducationLevel] : null,
  });

  const handleSubjectPress = (subject) => {
    navigation.navigate("SubjectClasses", { subject });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={localStyles.filtersContainer}>
        <DropDown
          label={"Education Levels"}
          mode={"outlined"}
          dropDownStyle={styles.input}
          visible={showEducationLevelDropdown}
          showDropDown={() => setShowEducationLevelDropdown(true)}
          onDismiss={() => setShowEducationLevelDropdown(false)}
          value={selectedEducationLevel}
          setValue={setSelectedEducationLevel}
          list={extractLabelList(educationLevels)}
        />
        <DropDown
          label={"Subject Category"}
          mode={"outlined"}
          style={styles.input}
          visible={showSubjectCategoryDropdown}
          showDropDown={() => setShowSubjectCategoryDropdown(true)}
          onDismiss={() => setShowSubjectCategoryDropdown(false)}
          value={selectedSubjectCategory}
          setValue={setSelectedSubjectCategory}
          list={extractLabelList(subjectCategories)}
        />
      </View>
      {filteredSubjects.map((subject) => (
        <Card onPress={() => handleSubjectPress(subject)}>
          <Card.Title title={subject.name} />
          <Card.Content>
            <Paragraph>{subject.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  filtersContainer: {
    marginBottom: 10,
  },
});

export default SearchSubject;
