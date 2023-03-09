import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ImageBackground,
    Image,
    Animated,
    SafeAreaView,
    Alert,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Tab, TabView, Text, Button } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'
import colors from '../../colors';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'
import CheckBox from '@react-native-community/checkbox';
function CommunityGameDetails({route}) {
    const {location,date,startTime,endTime,numOfPlayers} = route.params
    const [GameTitle, setGameTitle] = useState('Community Game')
    const [GameLocation, setGameLocation] = useState(location)
    const [GameDate, setGameDate] = useState(date)
    const [GameStartTime, setGameStartTime] = useState(startTime)
    const [GameEndTime, setGameEndTime] = useState(endTime)
    const [NumOfPlayers,setNumOfPlayers] = useState(numOfPlayers)
    const [GameLevel, setGameLevel] = useState('Pro')

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 400, height: 500, backgroundColor: colors.primary, borderRadius: '15%', alignItems: 'center', borderColor: colors.primary, borderWidth: 3 }}>
                <Text h3 h3Style={{ marginTop: '5%' }}>{GameTitle}</Text>
                <View style={{ width: '100%', flex: 1, alignItems: 'flex-start', marginTop: '10%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, width: '100%', height: '100%' }}>
                        <Text h4 style={styles.Text}>{GameLocation}</Text>
                        <Text h4 style={styles.Text}>{GameDate}</Text>
                        <Text h4 style={styles.Text}>{GameStartTime}-{GameEndTime}</Text>
                        <Text h4 style={styles.Text}>{GameLevel} Level</Text>
                        <Text h4 style={styles.Text}>{NumOfPlayers} players already in</Text>

                    </View>

                </View>
                <View style={{ width: '100%', height: '100%', flex: 1 }}>
                    <MapView
                        style={{ width: '100%', height: '100%', borderRadius: '15%' }}
                        maxZoomLevel={20}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            image={require('../../040ca4b7d907fc901da64c5015740a13-removebg-preview-removebg-preview.png')}
                        />
                    </MapView>
                </View>
                <View>

                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    <Button
                        title="Join Game"
                        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
                        titleStyle={{ color: 'white', marginHorizontal: 20 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    Text: {
        fontFamily: colors.font,
        marginBottom: '3%'
    },
})

export default CommunityGameDetails;