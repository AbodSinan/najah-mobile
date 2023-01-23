import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectClasses from "./SubjectClasses/";
import SearchSubject from "./SearchSubject";
import ClassInfo from "../ClassInfo";
import CreateClass from "../CreateClass";

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
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Stack.Screen
        name="Search Subject"
        component={SearchSubject}
        options={{
          title: "بحث عن موضوع",
        }}
      />
      <Stack.Screen
        name="Subject Classes"
        component={SubjectClasses}
        options={{
          title: "دروس الموضوع",
        }}
      />
      <Stack.Screen
        name="Create Class"
        component={CreateClass}
        options={{
          title: "درس جديد",
        }}
      />
      <Stack.Screen
        name="Class Info"
        component={ClassInfo}
        options={{
          title: "معلومات الدروس",
        }}
      />
    </Stack.Navigator>
  );
};

export default ClassesScreen;
