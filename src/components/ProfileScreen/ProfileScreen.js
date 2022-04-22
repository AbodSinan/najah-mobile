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
      <List.Item>First name: {firstName}</List.Item>
      <List.Item>Last name: {lastName}</List.Item>
      <List.Item>Email: {email}</List.Item>
      <List.Item>Gender: {gender}</List.Item>
      <List.Subheader>Description</List.Subheader>
      <List.Item>Education Level: {educationLevel}</List.Item>
      <List.Item>{description}</List.Item>
    </List.Section>
  );
};

export default ProfileScreen;
