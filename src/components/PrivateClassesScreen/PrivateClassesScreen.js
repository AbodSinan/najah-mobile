import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
      <Stack.Screen name="PrivateClassesList" component={PrivateClassesList} />
      <Stack.Screen name="CreatePrivateClass" component={CreatePrivateClass} />
    </Stack.Navigator>
  );
};

export default PrivateClassesScreen;
