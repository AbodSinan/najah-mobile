import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassInfo from "../ClassInfo";
import CreatePrivateClass from "./CreatePrivateClass";
import PrivateClassesList from "./PrivateClassesList";

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
        name="Private Classes List"
        component={PrivateClassesList}
        options={{
          title: "الدروس الخصوصية",
        }}
      />
      <Stack.Screen
        name="Class Info"
        component={ClassInfo}
        options={{
          title: "معلومات الدرس",
        }}
      />
      <Stack.Screen
        name="Create Private Class"
        component={CreatePrivateClass}
        options={{
          title: "درس خصوصي جديد",
        }}
      />
    </Stack.Navigator>
  );
};

export default PrivateClassesScreen;
