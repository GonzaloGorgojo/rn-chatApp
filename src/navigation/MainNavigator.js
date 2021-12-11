import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "../screens/InitialScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ChatScreen from "../screens/ChatScreen";
import { screenLoginOptions } from "../screens/LoginScreen";

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator initialRouteName="Main">
      <MainStackNavigator.Screen
        name="Main"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <MainStackNavigator.Screen
        name="Login"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <MainStackNavigator.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </MainStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = ({ navigation }) => {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Login">
      <MainStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={screenLoginOptions}
      />
      <HomeStackNavigator.Screen
        name="Chat"
        component={ChatScreen}
        // options={{ headerShown: false }}
      />
    </HomeStackNavigator.Navigator>
  );
};
