import React from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ClassesScreen from "../ClassesScreen";
import UserTypeScreen from "../UserTypeScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import ProfileScreen from "../ProfileScreen";
import SearchClassScreen from "../SearchClassScreen";
import PrivateClassesScreen from "../PrivateClassesScreen";

import { getUserToken } from "../../sagas/selectors";
import { theme } from "../../styles/theme";
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
          screenOptions={{
            style: { ...styles.container },
            headerStyle: {
              backgroundColor: "red",
            },
          }}
        >
          <Tab.Screen
            name="My Classes"
            component={ClassesScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="list-ul" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Academy"
            component={SearchClassScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="graduation-cap" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Private Classes"
            component={PrivateClassesScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="user-friends" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
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
