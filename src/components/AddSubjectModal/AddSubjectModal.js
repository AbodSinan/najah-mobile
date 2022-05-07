import React, { useState } from "react";

import { Portal, Dialog, Paragraph, TextInput } from "react-native-paper";
import { DropDown } from "react-native-paper-dropdown";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import styles from "../../styles";

const AddSubjectModal = ({ isShown, onDismiss }) => {
  const dispatcher = useDispatch();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const subjectCategories = useSelector(getSubjectCategories);
  const educationLevels = useSelector(getEducationLevels);

  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

  const handleConfirmPress = () => {
    dispatcher(
      api.createSubject.createAction({
        subjectCategory: selectedSubjectCategory,
        educationLevels: selectedEducationLevel,
      })
    );
  };
  return (
    <Portal>
      <Dialog visible={isModalShown} onDismiss={onDismiss}>
        <Dialog.Title>Create Subject</Dialog.Title>
        <Dialog.Content>
          <DropDown
            label={"Subject Category"}
            mode={"outlined"}
            inputProps={{ style: styles.dropDown }}
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
            visible={showEducationLevelDropdown}
            showDropDown={() => setShowEducationLevelDropdown(true)}
            onDismiss={() => setShowEducationLevelDropdown(false)}
            value={selectedEducationLevel}
            setValue={setSelectedEducationLevel}
            list={extractLabelList(educationLevels)}
          />
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="Number of classes"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="Number of classes"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleConfirmPress}>Confirm</Button>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddSubjectModal;
