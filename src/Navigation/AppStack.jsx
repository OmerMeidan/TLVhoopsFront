import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import ViewProfile from "../assets/screens/ViewProfile";
import PostAGame from "../assets/screens/PostAGame";
import About from "../assets/screens/About";
import ContactUs from "../assets/screens/ContactUs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../assets/components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


const AppStack = () => {
  const navigation = useNavigation()

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} drawer screenOptions={{
      headerTintColor:'#fff', 
      headerTitle: '', headerStyle: { backgroundColor: "#3A98B9" },
      drawerLabelStyle: { marginLeft: -25, fontSize: 15, },
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 15 }}
          />
          </TouchableOpacity>
        </View>
      ),
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
      <Drawer.Screen component={ContactUs} name="Contact Us" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="call-outline" size={22} color={color} />
        )
      }} />

    </Drawer.Navigator>
  );
};

export default AppStack;
