import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { List, Button, Surface, Divider } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user";
import * as selectors from "../../../sagas/selectors";

import ProfileImage from "../ProfileImage";
import styles from "../../../styles";
import { theme } from "../../../styles/theme";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { fullName, image, description, gender, educationLevel, email } =
    useSelector(selectors.getUserInfo);

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
            <List.Item
              title={`Full Name`}
              description={fullName}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <Divider />
            <List.Item
              title={`Email`}
              description={email}
              left={(props) => <List.Icon {...props} icon="email" />}
            />
            <Divider />
            <List.Item
              title={`Gender`}
              description={gender}
              left={(props) => <List.Icon {...props} icon="gender-female" />}
            />
            <Divider />
            <List.Subheader style={localStyles.profileHeader}>
              Description
            </List.Subheader>
            <List.Item
              title={`Education Level`}
              description={educationLevel}
              left={(props) => <List.Icon {...props} icon="school" />}
            />
            <Divider />
            <List.Item title={`Biography`} description={description} />
          </List.Section>
        </Surface>
      </ScrollView>
      <View style={localStyles.buttonRow}>
        <Button
          style={styles.actionbutton}
          mode="contained"
          onPress={handleLogout}
        >
          Logout
        </Button>
        <Button
          style={styles.actionbutton}
          mode="contained"
          onPress={() => navigation.navigate("Edit Profile")}
        >
          Edit Profile
        </Button>
      </View>
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
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ProfileScreen;
