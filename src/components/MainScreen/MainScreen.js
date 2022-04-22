import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ProfileScreen from "../ProfileScreen";
import ClassesScreen from "../ClassesScreen";

const Tab = createMaterialBottomTabNavigator();

const MainScreen = ({ navigator }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="SearchClasses" component={ClassesScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;
