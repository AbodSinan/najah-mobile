import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassesList from "./ClassesList";
import CreateClass from "../CreateClass";
import ClassInfo from "../ClassInfo";

import styles from "../../styles";
import { theme } from "../../styles/theme";

const Stack = createStackNavigator();

const MyClassesScreen = ({ navigator }) => {
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
      <Stack.Screen name="Classes List" component={ClassesList} />
      <Stack.Screen name="Create Class" component={CreateClass} />
      <Stack.Screen name="Class Info" component={ClassInfo} />
    </Stack.Navigator>
  );
};

export default MyClassesScreen;
