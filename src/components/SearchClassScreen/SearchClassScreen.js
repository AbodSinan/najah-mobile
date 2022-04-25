import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchClass from "./SearchClass";

const Stack = createStackNavigator();

const ClassesScreen = ({ navigator }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchClass" component={SearchClass} />
    </Stack.Navigator>
  );
};

export default ClassesScreen;
