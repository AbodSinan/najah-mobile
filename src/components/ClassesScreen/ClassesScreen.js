import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassesList from "./ClassesList";
import CreateClass from "./CreateClass";
import ClassInfo from "../SearchClassScreen/ClassInfo";

const Stack = createStackNavigator();

const ClassesScreen = ({ navigator }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClassesList" component={ClassesList} />
      <Stack.Screen name="CreateClass" component={CreateClass} />
      <Stack.Screen name="ClassInfo" component={ClassInfo} />
    </Stack.Navigator>
  );
};

export default ClassesScreen;
