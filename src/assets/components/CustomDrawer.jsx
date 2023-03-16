import React, { useContext, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../colors';



const CustomDrawer = (props) => {
    const navigation = useNavigation();


    const handleLogOut = () => {
        console.log('log out')
        AsyncStorage.removeItem('token')
        navigation.navigate('OnBoarding');
    }



    return (

        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} style={{fontFamily: colors.font}} >

                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../images/tlvhooks2.png')}
                        style={{ width: 100, height: 100, }} />
                </View>
                <View style={{ flex: 1, paddingTop: 10 , }}>
                    <DrawerItemList {...props}   drawerContentOptions={{ labelStyle: { fontSize: 18, fontFamily: colors }}}/>
                </View>

            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={() => { handleLogOut() }} style={{ paddingVertical: 7 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="log-out-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: colors.font,
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
