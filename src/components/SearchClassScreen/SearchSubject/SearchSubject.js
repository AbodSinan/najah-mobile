import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FAB } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {
  getEducationLevels,
  getSubjectCategories,
  getSubjectsWithClasses,
} from "../../../sagas/selectors";
import { extractLabelList, filterSubjects } from "../../../utils/commonUtils";

import AlignedText from "../../AlignedText";

import styles from "../../../styles";
import { theme } from "../../../styles/theme";

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
        color={theme.colors.contrast}
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
        <View style={styles.bottomPadded}>
          {filterSubjects.length > 0 ? (
            <AlignedText variant="headlineMedium">المواد المتوفرة</AlignedText>
          ) : (
            <AlignedText variant="headlineMedium">
              لا توجد مواد حاليا
            </AlignedText>
          )}
        </View>
        {filteredSubjects.map((subject) => (
          <Card
            key={subject.id}
            onPress={() => handleSubjectPress(subject)}
            style={styles.card}
          >
            <Card.Title
              titleStyle={{ textAlign: "right" }}
              title={subject.name}
              titleVariant="titleLarge"
            />
            <Card.Content>
              <AlignedText variant="bodyLarge">
                {subject.description}
              </AlignedText>
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
