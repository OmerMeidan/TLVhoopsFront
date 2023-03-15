
import React, { useContext } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from '../context/AuthContext';
import LottieView from 'lottie-react-native';

const AppNav = () => {
    const { token } = useContext(AuthContext)


    return (
        <NavigationContainer>
            {token? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )

}

export default AppNav
