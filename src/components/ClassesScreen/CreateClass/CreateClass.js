import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { StyleSheet, View } from "react-native";

import {
  getSubjects,
  getSubjectCategories,
  getEducationLevels,
} from "../../../sagas/selectors";
import api from "../../../services/api/Api";
import frequencyEnum from "../../../enums/frequencyEnum";

const CreateClass = ({ navigator }) => {
  const dispatcher = useDispatch();

  const subjects = useSelector(getSubjects);
  const subjectCategories = useSelector(getSubjectCategories);
  const educationLevels = useSelector(getEducationLevels);

  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [duration, setDuration] = useState(0);
  const [noOfTimes, setNoOfTimes] = useState(0);
  const [frequency, setFrequency] = useState(frequencyEnum.MONTHLY);
  const [description, setDescription] = useState("");
  const [ratePerHour, setRatePerHour] = useState(0);

  const handleSubmit = () => {
    dispatcher(
      api.createClass.createAction({
        selectedSubject,
        selectedEducationLevel,
        selectedSubjectCategory,
        duration,
        noOfTimes,
        frequency,
        description,
        ratePerHour,
      })
    );
  };
  return (
    <View>
      <DropDown
        label={"Subject"}
        mode={"outlined"}
        visible={showSubjectDropdown}
        showDropDown={() => setShowSubjectDropdown(true)}
        onDismiss={() => setShowSubjectDropdown(false)}
        value={selectedSubject}
        setValue={setSelectedSubject}
        list={subjects}
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
      <Button mode="contained" onPress={handleSubmit} title="Submit" />
    </View>
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
