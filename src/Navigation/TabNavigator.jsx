import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import HomeScreen from "../assets/screens/HomeScreen";
import PostAGame from "../assets/screens/PostAGame";
import MyGames from "../assets/screens/MyGames";
import GamesDetails from "../assets/screens/PremiumGameDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={HomeScreen} name="HomeScreen" />
            <Stack.Screen component={GamesDetails} name="GamesDetails" />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarLabelStyle: { fontSize: 13 }, tabBarStyle: { backgroundColor: "#3A98B9" }, tabBarInactiveTintColor: '#fff', tabBarActiveTintColor: '#155372'
        }}>

            < Tab.Screen name="Home" component={HomeStack} options={{

                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} pass />

                )
            }} />
            < Tab.Screen name="Post A Game" component={PostAGame} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add" color={color} size={size} />
                )
            }} />
            < Tab.Screen name="My Games" component={MyGames} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list-outline" color={color} size={size} />
                )
            }} />
        </Tab.Navigator >
    )
};

export default TabNavigator;
