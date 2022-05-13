import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectClasses from "./SubjectClasses/";
import SearchSubject from "./SearchSubject";
import ClassInfo from "../ClassInfo";

import { theme } from "../../styles/theme";
import styles from "../../styles";

const Stack = createStackNavigator();

const ClassesScreen = ({ navigator }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        style: { ...styles.container },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="Search Subject" component={SearchSubject} />
      <Stack.Screen name="Subject Classes" component={SubjectClasses} />
      <Stack.Screen name="Class Info" component={ClassInfo} />
    </Stack.Navigator>
  );
};

export default ClassesScreen;
