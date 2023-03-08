import React, { useContext, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const CustomDrawer = (props) => {
    const navigation = useNavigation();


    const handleLogOut = () => {
        console.log('log out')
        AsyncStorage.removeItem('token')
        navigation.navigate('OnBoarding');
    }



    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <Image source={require('../images/DemoLogo.jpeg')}
                    style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <DrawerItemList{...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { handleLogOut() }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="log-out-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,

                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer;
