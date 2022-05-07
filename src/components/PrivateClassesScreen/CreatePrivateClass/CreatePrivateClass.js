import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import {
  getSubjects,
  getSubjectCategories,
  getEducationLevels,
} from "../../../sagas/selectors";
import { filterSubjects, extractLabelList } from "../../../utils/commonUtils";
import api from "../../../services/api/Api";
import styles from "../../../styles";

const CreatePrivateClass = ({ navigation }) => {
  const dispatcher = useDispatch();

  const subjects = useSelector(getSubjects);
  const subjectCategories = useSelector(getSubjectCategories);
  const educationLevels = useSelector(getEducationLevels);

  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

  const [showSubjectCategoryDropdown, setShowSubjectCategoryDropdown] =
    useState(false);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);

  const filteredSubjects = filterSubjects({
    subjects,
    subjectCategories: [selectedSubject],
    educationLevels: [selectedEducationLevel],
  });

  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = () => {
    dispatcher(
      api.createPrivateClass.createAction({
        subject: selectedSubject,
        educationLevel: selectedEducationLevel,
        description,
        rate,
      })
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View>
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
        <DropDown
          label={"Education Levels"}
          mode={"outlined"}
          inputProps={{ style: styles.dropDown }}
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
          inputProps={{ style: styles.dropDown }}
          style={styles.input}
          visible={showSubjectDropdown}
          showDropDown={() => setShowSubjectDropdown(true)}
          onDismiss={() => setShowSubjectDropdown(false)}
          value={selectedSubject}
          setValue={setSelectedSubject}
          list={extractLabelList(filteredSubjects)}
        />
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder="Rate"
          value={rate}
          onChangeText={(text) => setRate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        title="Submit"
        style={styles.actionbutton}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

export default CreatePrivateClass;
