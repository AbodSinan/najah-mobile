import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "./UserProfile";
import EditProfile from "../EditProfile/EditProfile";

import { theme } from "../../styles/theme";

const Stack = createStackNavigator();

const PrivateClassesScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="User Profile" component={UserProfile} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default PrivateClassesScreen;
