import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  persistNavigationState,
  retrieveNavigationState,
} from "../../actions/navigation";
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
  const dispatch = useDispatch();
  const navigationState = useSelector((state) => state.navigation);
  const isSignedIn = !!useSelector(getUserToken);

  useEffect(() => {
    dispatch(persistNavigationState(navigationState));
  }, [navigationState, dispatch]);

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
          onStateChange={(state) => dispatch(persistNavigationState(state))}
          initialState={navigationState}
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
          onStateChange={(state) => dispatch(persistNavigationState(state))}
          initialState={navigationState}
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
