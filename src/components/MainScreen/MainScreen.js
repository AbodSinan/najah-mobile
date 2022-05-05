import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ClassesScreen from "../ClassesScreen";
import UserTypeScreen from "../UserTypeScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import ProfileScreen from "../ProfileScreen";
import SearchClassScreen from "../SearchClassScreen";

import { getUserToken } from "../../sagas/selectors";
import styles from "../../styles";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainScreen = ({ navigator }) => {
  const isSignedIn = !!useSelector(getUserToken);
  return (
    <>
      {isSignedIn ? (
        <Tab.Navigator
          initialRouteName="Profile"
          screenOptions={{ style: { ...styles.container } }}
        >
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Classes" component={ClassesScreen} />
          <Tab.Screen name="SearchClass" component={SearchClassScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UserType" component={UserTypeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default MainScreen;
