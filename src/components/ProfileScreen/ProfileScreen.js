import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { List, Button, Surface, Divider } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../actions/user";
import * as selectors from "../../sagas/selectors";

import ProfileImage from "./ProfileImage";
import styles from "../../styles";
import { theme } from "../../styles/theme";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    age,
    image,
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
      <ProfileImage image={image} />
      <ScrollView>
        <Surface style={localStyles.profileContainer}>
          <List.Section>
            <List.Subheader style={localStyles.profileHeader}>
              User info
            </List.Subheader>
            <List.Item title={`First name: ${firstName}`} />
            <Divider />
            <List.Item title={`Last name: ${lastName}`} />
            <Divider />
            <List.Item title={`Email: ${email}`} />
            <Divider />
            <List.Item title={`Gender: ${gender}`} />
            <Divider />
            <List.Subheader style={localStyles.profileHeader}>
              Description
            </List.Subheader>
            <List.Item title={`Education Level: ${educationLevel}`} />
            <Divider />
            <List.Item title={description} />
          </List.Section>
        </Surface>
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

const localStyles = StyleSheet.create({
  profileContainer: {
    borderRadius: 5,
  },
  profileHeader: {
    color: theme.colors.background,
    backgroundColor: theme.colors.primary,
  },
});

export default ProfileScreen;
