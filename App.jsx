import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from 'react';
import AppStack from './src/Navigation/AppStack'
import AuthStack from './src/Navigation/AuthStack'
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/Navigation/AppNav";
import { AuthContext } from './src/context/AuthContext';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./src/assets/screens/OnBoarding";
import Login from "./src/assets/screens/Login";
import HomeScreen from "./src/assets/screens/HomeScreen";
import PremiumGameDetails from "./src/assets/screens/PremiumGameDetails";
import CommunityGameDetails from "./src/assets/screens/CommunityGameDetails";

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <AuthProvider >
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen component={OnBoarding} name="OnBoarding" options={{ title: '' }} />
          <Stack.Screen component={Login} name="Login" options={{ title: '' }} />
          <Stack.Screen component={AppStack} name="AppStack" options={{ headerShown: false }} />
          <Stack.Screen component={PremiumGameDetails} name="PremiumGameDetails" options={{ title: '' }} />
          <Stack.Screen component={CommunityGameDetails} name="CommunityGameDetails" options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>



  );
};

export default App;
