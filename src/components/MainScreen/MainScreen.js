import React from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MyClassesScreen from "../MyClassesScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import ProfileScreen from "../ProfileScreen";
import SearchClassScreen from "../SearchClassScreen";
import PrivateClassesScreen from "../PrivateClassesScreen";

import { getUserToken } from "../../sagas/selectors";
import EditProfile from "../EditProfile/EditProfile";

import styles from "../../styles";
import { theme } from "../../styles/theme";

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
            headerTitleAlign: "center",
            headerTitleStyle: styles.headerTitleStyle,
          }}
        >
          <Tab.Screen
            name="My Classes"
            component={MyClassesScreen}
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
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleAlign: "center",
            headerTitleStyle: styles.headerTitleStyle,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Create Profile" component={EditProfile} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default MainScreen;
