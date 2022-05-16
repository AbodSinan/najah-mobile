import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassInfo from "../ClassInfo";
import CreatePrivateClass from "./CreatePrivateClass";
import PrivateClassesList from "./PrivateClassesList";

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
      <Stack.Screen
        name="Private Classes List"
        component={PrivateClassesList}
      />
      <Stack.Screen name="Class Info" component={ClassInfo} />
      <Stack.Screen
        name="Create Private Class"
        component={CreatePrivateClass}
      />
    </Stack.Navigator>
  );
};

export default PrivateClassesScreen;
