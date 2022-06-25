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
  const dispatcher = useDispatch();

  const educationLevels = useSelector(getEducationLevels);
  const { currentFirstName, currentLastName, currentBio } =
    useSelector(getUserInfo);
  const [firstName, setFirstName] = useState(currentFirstName);
  const [lastName, setLastName] = useState(currentLastName);
  const [bio, setBio] = useState(currentBio);

  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);

  const { editProfileStatus } = useSelector(getUserStatus);

  const handleSubmit = () => {
    dispatcher(
      api.editProfile.createAction({
        firstName,
        lastName,
        bio,
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
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        textContentType="familyname"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Bio"
        textContentType="jobTitle"
        value={bio}
        onChangeText={(text) => setBio(text)}
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
