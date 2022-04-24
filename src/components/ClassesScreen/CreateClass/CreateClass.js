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
import { extractLabelList } from "../../../utils/commonUtils";

const CreateClass = ({ navigator }) => {
  const dispatcher = useDispatch();
  const frequencyList = Object.entries(frequencyEnum).map((key) => ({
    label: key[0],
    value: key[1],
  }));
  console.log(frequencyList);

  const subjects = useSelector(getSubjects);
  const subjectCategories = useSelector(getSubjectCategories);
  const educationLevels = useSelector(getEducationLevels);

  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [duration, setDuration] = useState(null);
  const [noOfTimes, setNoOfTimes] = useState(null);
  const [frequency, setFrequency] = useState(frequencyEnum.MONTHLY);
  const [description, setDescription] = useState("");
  const [ratePerHour, setRatePerHour] = useState(null);

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
        list={extractLabelList(subjects)}
      />
      <DropDown
        label={"Frequency"}
        mode={"outlined"}
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
