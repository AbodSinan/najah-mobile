import React from "react";
import { List } from "react-native-paper";

import { useSelector } from "react-redux";
import * as selectors from "../../sagas/selectors";
const ProfileScreen = () => {
  const {
    firstName,
    lastName,
    age,
    description,
    gender,
    educationLevel,
    email,
  } = useSelector(selectors.getUserInfo);

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
    </List.Section>
  );
};

export default ProfileScreen;
