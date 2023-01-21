import React, { useEffect, useState } from "react";

import {
  Portal,
  Dialog,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { useDispatch, useSelector } from "react-redux";

import {
  getSubjectCategories,
  getEducationLevels,
  getApiStatus,
} from "../../sagas/selectors";
import api from "../../services/api/Api";
import { extractLabelList } from "../../utils/commonUtils";

import styles from "../../styles";
import apiStatusEnum from "../../enums/apiStatusEnum";

const AddSubjectModal = ({ isShown, onDismiss }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const subjectCategories = useSelector(getSubjectCategories);
  const educationLevels = useSelector(getEducationLevels);
  const { createSubjectStatus } = useSelector(getApiStatus);

  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);

  const [showSubjectCategoryDropdown, setShowSubjectCategoryDropdown] =
    useState(false);
  const [showEducationLevelDropdown, setShowEducationLevelDropdown] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPress = () => {
    dispatch(
      api.createSubject.createAction({
        name,
        subjectCategory: selectedSubjectCategory,
        educationLevels: selectedEducationLevel,
      })
    );
  };

  useEffect(() => {
    if (
      [apiStatusEnum.AWAITING, apiStatusEnum.REQUESTED].includes(
        createSubjectStatus
      )
    ) {
      setIsLoading(true);
    } else if (createSubjectStatus === apiStatusEnum.SUCCESS) {
      setIsLoading(false);
      onDismiss();
    }
  }, [createSubjectStatus]);

  return (
    <Portal>
      <Dialog visible={isShown} onDismiss={onDismiss}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
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
                list={extractLabelList(subjectCategories, null, true)}
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
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="Subject Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleConfirmPress}>Confirm</Button>
              <Button onPress={onDismiss}>Cancel</Button>
            </Dialog.Actions>
          </>
        )}
      </Dialog>
    </Portal>
  );
};

export default AddSubjectModal;
