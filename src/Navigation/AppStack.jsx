import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ViewProfile from "../assets/screens/ViewProfile";
import PostAGame from "../assets/screens/PostAGame";
import About from "../assets/screens/About";
import ConnectUs from "../assets/screens/ConnectUs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../assets/components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} drawer screenOptions={{
      headerShown: false, drawerLabelStyle: { marginLeft: -25, fontSize: 15, }
    }}>
      <Drawer.Screen component={TabNavigator} name="Home Screen" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={ViewProfile} name="View Profile" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={PostAGame} name="Post A Game " options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="add" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={About} name="About" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="information-circle-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={ConnectUs} name="Connect Us" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="call-outline" size={22} color={color} />
        )
      }} />

    </Drawer.Navigator>
  );
};

export default AppStack;
