import React from "react";
import { List, Button } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../actions/user";
import * as selectors from "../../sagas/selectors";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    age,
    description,
    gender,
    educationLevel,
    email,
  } = useSelector(selectors.getUserInfo);

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <List.Section>
      <List.Subheader>User info</List.Subheader>
      <List.Item title={`First name: ${firstName}`} />
      <List.Item title={`Last name: ${lastName}`} />
      <List.Item title={`Email: ${email}`} />
      <List.Item title={`Gender: ${gender}`} />
      <List.Subheader>Description</List.Subheader>
      <List.Item title={`Education Level: ${educationLevel}`} />
      <List.Item title={description} />
      <Button onPress={handleLogout}>Logout</Button>
    </List.Section>
  );
};

export default ProfileScreen;
