

import React, { useContext } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnBoarding from "../assets/screens/OnBoarding";
import Login from "../assets/screens/Login";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator options={{ headerShown: false }} >
      <Stack.Screen component={OnBoarding} name="OnBoarding" />
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
};

export default AuthStack;
