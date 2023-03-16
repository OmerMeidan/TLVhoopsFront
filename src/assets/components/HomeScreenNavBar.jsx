import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ImageBackground,
    Image,
    Animated,
    SafeAreaView,
    Button,
    Alert,
    Platform,
    Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Tab, TabView, } from '@rneui/themed';
import HomeScreen from '../screens/HomeScreen';

import { useState } from 'react';

function HomeScreenNavBar() {
    const [index, setIndex] = useState(0)

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <StatusBar style={styles.container} />
            </SafeAreaView>
            <TabView value={index} onChange={setIndex} animationType="spring">

                <TabView.Item style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                <HomeScreen/>
                </TabView.Item>

                <TabView.Item style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                   
                </TabView.Item>

                <TabView.Item style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                   
                </TabView.Item>

                <TabView.Item style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                
                </TabView.Item>

            </TabView>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 0,
                }}
                style={{ height: '9%' }}
                variant="primary"
            >
                <Tab.Item
                    style={{ height: '100%' }}
                    title="Profile"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'person-circle-outline', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    style={{ height: '100%' }}
                    title="Home"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'basketball-outline', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    style={{ height: '100%', }}
                    title="Post a Game"
                    titleStyle={{ fontSize: 12,  }}
                    icon={{ name: "add-circle-outline", type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Log out"
                    titleStyle={{ fontSize: 12, fontFamily: colors.font }}
                    icon={{ name: 'log-out-outline', type: 'ionicon', color: 'white' }}
                />
            </Tab>
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         marginTop: '10%',
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontStyle: 'white',
//         paddingTop: Platform.OS === 'android' ? 20 : 0
//     },
// })

export default HomeScreenNavBar;