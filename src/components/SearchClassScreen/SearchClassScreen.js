import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchSubject from "./SearchSubject";

const Stack = createStackNavigator();

const ClassesScreen = ({ navigator }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchSubject" component={SearchSubject} />
      <Stack.Screen name="SubjectClasses" component={SubjectClasses} />
    </Stack.Navigator>
  );
};

export default ClassesScreen;
