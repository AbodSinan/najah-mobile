import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "./UserProfile";
import EditProfile from "../EditProfile/EditProfile";

import styles from "../../styles";
import { theme } from "../../styles/theme";

const Stack = createStackNavigator();

const PrivateClassesScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={{ title: "ملف المستحدم" }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ title: "تعديل المعلومات" }}
      />
    </Stack.Navigator>
  );
};

export default PrivateClassesScreen;
