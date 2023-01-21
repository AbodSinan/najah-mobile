import React, { useState } from "react";

import { Button, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useDispatch, useSelector } from "react-redux";

import { extractLabelList } from "../../utils/commonUtils";

import {
  getEducationLevels,
  getUserInfo,
  getUserStatus,
} from "../../sagas/selectors";
import api from "../../services/api/Api";
import styles from "../../styles";
import LoadingContainer from "../LoadingContainer/LoadingContainer";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const educationLevels = useSelector(getEducationLevels);
  const { firstName, lastName, description, educationLevel } =
    useSelector(getUserInfo);
  const [inputFirstName, setFirstName] = useState(firstName);
  const [inputLastName, setLastName] = useState(lastName);
  const [inputDescription, setDescription] = useState(description);

  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState(educationLevel);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);

  const { editProfileStatus } = useSelector(getUserStatus);

  const handleSubmit = () => {
    dispatch(
      api.editProfile.createAction({
        firstName: inputFirstName,
        lastName: inputLastName,
        description: inputDescription,
        selectedEducationLevel,
      })
    );
  };

  return (
    <LoadingContainer
      apiStatus={editProfileStatus}
      containerStyle={styles.container}
      onSuccess={() => navigation.navigate("User Profile")}
    >
      <TextInput
        style={styles.input}
        placeholder="Enter first name"
        textContentType="name"
        value={inputFirstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        textContentType="familyname"
        value={inputLastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Bio"
        textContentType="jobTitle"
        value={inputDescription}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <DropDown
        label={"Education Levels"}
        mode={"outlined"}
        inputProps={{ style: styles.dropDown }}
        visible={showEducationLevelDropdown}
        showDropDown={() => setShowEducationLevelDropdown(true)}
        onDismiss={() => setShowEducationLevelDropdown(false)}
        value={selectedEducationLevel}
        setValue={setSelectedEducationLevel}
        list={extractLabelList(educationLevels, null, true)}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        title="Submit"
        style={styles.actionbutton}
      >
        Submit
      </Button>
    </LoadingContainer>
  );
};

export default EditProfile;
