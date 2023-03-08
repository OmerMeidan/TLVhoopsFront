import React, { useContext } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import AppStack from './AppStack';
import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext';
import LottieView from 'lottie-react-native';

const AppNav = () => {
    const { isLoading, token } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../assets/32960-loader-basketball (2).json')}
                    loop
                    autoPlay
                />
            </View>
        )
    }
    return (
        <NavigationContainer>
            {token !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )

}

export default AppNav
