import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ClassesScreen from "../ClassesScreen";
import UserTypeScreen from "../UserTypeScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import ProfileScreen from "../ProfileScreen";

import { getUserToken } from "../../sagas/selectors";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainScreen = ({ navigator }) => {
  const isSignedIn = !!useSelector(getUserToken);
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Classes" component={ClassesScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="UserType" component={UserTypeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainScreen;
