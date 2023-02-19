import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { List, Button, Surface, Divider } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user";
import * as selectors from "../../../sagas/selectors";
import Api from "../../../services/api/Api";

import AlignedText from "../../AlignedText";
import ProfileImage from "../ProfileImage";
import styles from "../../../styles";
import { theme } from "../../../styles/theme";

const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { fullName, image, description, gender, educationLevel, email } =
    useSelector((state) => selectors.getUserInfo(state, profileId));

  const { profileId } = route?.params || {};

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  useEffect(() => {
    if (!fullName) {
      navigation.navigate("Edit Profile");
    }
  }, [fullName]);

  useEffect(() => {
    if (profileId) {
      dispatch(Api.getProfile.createAction({ profileId }));
    }
  }, [profileId]);

  return (
    <View style={styles.container}>
      <ProfileImage image={image} />
      <ScrollView>
        <Surface style={localStyles.profileContainer}>
          <List.Section>
            <List.Subheader style={localStyles.profileHeader}>
              <AlignedText
                variant="titleLarge"
                style={{ color: theme.colors.contrast }}
              >
                معلومات المستخدم
              </AlignedText>
            </List.Subheader>
            <List.Item
              title={`الأسم الكامل`}
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
              title={`الجنس`}
              description={gender}
              left={(props) => <List.Icon {...props} icon="gender-female" />}
            />
            <Divider />
            <List.Subheader style={localStyles.profileHeader}>
              <AlignedText
                variant="titleLarge"
                style={{ color: theme.colors.contrast, lineHeight: 40 }}
              >
                السيرة الذاتية
              </AlignedText>
            </List.Subheader>
            <List.Item
              title={`المرحلة الدراسية`}
              description={educationLevel}
              left={(props) => <List.Icon {...props} icon="school" />}
            />
            <Divider />
            <List.Item title={`تفاصيل`} description={description} />
          </List.Section>
        </Surface>
      </ScrollView>
      <View style={localStyles.buttonRow}>
        <Button
          style={localStyles.bottomButtons}
          mode="contained"
          onPress={handleLogout}
        >
          <AlignedText
            variant="headlineSmall"
            style={{ color: theme.colors.contrast, lineHeight: 40 }}
          >
            تسجيل خروج
          </AlignedText>
        </Button>
        <Button
          style={localStyles.bottomButtons}
          mode="contained"
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <AlignedText
            variant="headlineSmall"
            style={{ color: theme.colors.contrast }}
          >
            تعديل المعلومات
          </AlignedText>
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
  },
  bottomButtons: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 0,
    height: 70,
    borderLeftColor: theme.colors.contrast,
    borderRightColor: theme.colors.contrast,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default ProfileScreen;
