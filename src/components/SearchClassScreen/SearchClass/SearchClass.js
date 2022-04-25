import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ScrollView, StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {
  getEducationLevels,
  getSubjectCategories,
  getSubjects,
} from "../../../sagas/selectors";
import { extractLabelList, filterSubjects } from "../../../utils/commonUtils";

const SearchClass = ({ navigation }) => {
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
    subjectCategories: [selectedSubjectCategory],
    educationLevels: [selectedEducationLevel],
  });
  console.log(filteredSubjects);

  return (
    <ScrollView>
      <DropDown
        label={"Education Levels"}
        mode={"outlined"}
        style={styles.input}
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
      {subjects.map((subject) => (
        <Card>
          <Card.Title title={subject.name} />
          <Card.Content>
            <Paragraph>{subject.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#444",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
  },
});

export default SearchClass;
