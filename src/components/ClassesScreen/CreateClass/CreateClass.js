import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { StyleSheet, ScrollView } from "react-native";

import {
  getSubjects,
  getSubjectCategories,
  getEducationLevels,
} from "../../../sagas/selectors";
import { filterSubjects } from "../../../utils/commonUtils";
import api from "../../../services/api/Api";
import frequencyEnum from "../../../enums/frequencyEnum";
import { extractLabelList } from "../../../utils/commonUtils";

const CreateClass = ({ navigator }) => {
  const dispatcher = useDispatch();
  const frequencyList = Object.entries(frequencyEnum).map((key) => ({
    label: key[0],
    value: key[1],
  }));

  const subjects = useSelector(getSubjects);
  const subjectCategories = useSelector(getSubjectCategories);
  const educationLevels = useSelector(getEducationLevels);

  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

  const [showSubjectCategoryDropdown, setShowSubjectCategoryDropdown] =
    useState(false);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);

  console.log("SELECTEDCAT", selectedSubjectCategory);
  console.log("SELECT UDE", selectedEducationLevel);

  const filteredSubjects = filterSubjects({
    subjects,
    subjectCategories: [selectedSubject],
    educationLevels: [selectedEducationLevel],
  });
  console.log(filteredSubjects);

  const [duration, setDuration] = useState("");
  const [noOfTimes, setNoOfTimes] = useState("");
  const [frequency, setFrequency] = useState(frequencyEnum.MONTHLY);
  const [description, setDescription] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");

  const handleSubmit = () => {
    dispatcher(
      api.createClass.createAction({
        subject: selectedSubject,
        educationLevel: selectedEducationLevel,
        subjectCategory: selectedSubjectCategory,
        duration,
        noOfTimes,
        frequency,
        description,
        ratePerHour,
      })
    );
  };
  return (
    <ScrollView>
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
        label={"Subject"}
        mode={"outlined"}
        style={styles.input}
        visible={showSubjectDropdown}
        showDropDown={() => setShowSubjectDropdown(true)}
        onDismiss={() => setShowSubjectDropdown(false)}
        value={selectedSubject}
        setValue={setSelectedSubject}
        list={extractLabelList(filteredSubjects)}
      />
      <DropDown
        label={"Frequency"}
        mode={"outlined"}
        style={styles.input}
        visible={showFrequencyDropdown}
        showDropDown={() => setShowFrequencyDropdown(true)}
        onDismiss={() => setShowFrequencyDropdown(false)}
        value={frequency}
        setValue={setFrequency}
        list={frequencyList}
      />
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Rate per hour"
        value={ratePerHour}
        onChangeText={(text) => setRatePerHour(text)}
      />
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Number of classes"
        value={noOfTimes}
        onChangeText={(text) => setNoOfTimes(text)}
      />
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Class duration (Hours)"
        value={duration}
        onChangeText={(text) => setDuration(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <Button mode="contained" onPress={handleSubmit} title="Submit">
        Submit
      </Button>
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

export default CreateClass;
