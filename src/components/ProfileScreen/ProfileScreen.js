import React from "react";
import { ScrollView, View } from "react-native";
import { List, Button } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../actions/user";
import * as selectors from "../../sagas/selectors";
import styles from "../../styles";
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
    <View style={styles.container}>
      <ScrollView>
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
      </ScrollView>
      <Button
        style={styles.actionbutton}
        mode="contained"
        onPress={handleLogout}
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;
