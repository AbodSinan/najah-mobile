import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FAB, Paragraph, Title } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {
  getEducationLevels,
  getSubjectCategories,
  getSubjectsWithClasses,
} from "../../../sagas/selectors";
import { extractLabelList, filterSubjects } from "../../../utils/commonUtils";

import styles from "../../../styles";

const SearchSubject = ({ navigation }) => {
  const educationLevels = useSelector(getEducationLevels);
  const subjectCategories = useSelector(getSubjectCategories);
  const subjects = useSelector(getSubjectsWithClasses);

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

  const handleCreateClassPress = () => {
    navigation.navigate("Create Class");
  };

  const handleSubjectPress = (subject) => {
    navigation.navigate("Subject Classes", { subject });
  };

  return (
    <>
      <FAB
        style={styles.fab}
        label="Create Class"
        onPress={handleCreateClassPress}
      />
      <ScrollView style={styles.container}>
        <View style={localStyles.filtersContainer}>
          <DropDown
            label={"Education Levels"}
            mode={"outlined"}
            inputProps={{ style: styles.dropDown }}
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
            inputProps={{ style: styles.dropDown }}
            style={styles.input}
            visible={showSubjectCategoryDropdown}
            showDropDown={() => setShowSubjectCategoryDropdown(true)}
            onDismiss={() => setShowSubjectCategoryDropdown(false)}
            value={selectedSubjectCategory}
            setValue={setSelectedSubjectCategory}
            list={extractLabelList(subjectCategories)}
          />
        </View>
        {filterSubjects.length > 0 ? (
          <Title>المواد المتوفرة</Title>
        ) : (
          <Title>لا توجد مواد حاليا</Title>
        )}

        {filteredSubjects.map((subject) => (
          <Card
            key={subject.id}
            onPress={() => handleSubjectPress(subject)}
            style={styles.card}
          >
            <Card.Title title={subject.name} />
            <Card.Content>
              <Paragraph>{subject.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

const localStyles = StyleSheet.create({
  filtersContainer: {
    marginBottom: 10,
  },
});

export default SearchSubject;
