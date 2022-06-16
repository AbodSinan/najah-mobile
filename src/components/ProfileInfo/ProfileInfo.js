import React, { useState } from "react";

import View from "react-native";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useSelector } from "react-redux";

import { getEducationLevels } from "../../sagas/selectors";
import styles from "../../styles";

const ProfileInfo = ({ navigation }) => {
  const educationLevels = useSelector(getEducationLevels);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default ProfileInfo;
