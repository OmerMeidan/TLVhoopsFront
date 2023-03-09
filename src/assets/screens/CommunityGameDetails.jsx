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
import { CheckBox } from '@rneui/themed';


function CommunityGameDetails({ route }) {
    const { location, date, startTime, endTime, numOfPlayers } = route.params
    const [GameTitle, setGameTitle] = useState('Community Game')
    const [GameLocation, setGameLocation] = useState(location)
    const [GameDate, setGameDate] = useState(date)
    const [GameStartTime, setGameStartTime] = useState(startTime)
    const [GameEndTime, setGameEndTime] = useState(endTime)
    const [NumOfPlayers, setNumOfPlayers] = useState(numOfPlayers)
    const [GameLevel, setGameLevel] = useState('Pro')
    const [toggleTermsCheckBox, setToggleTermsCheckBox] = useState(false)
    const [toggleWaiverCheckBox, setToggleWaiverCheckBox] = useState(false)
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 320, height: 700, backgroundColor: "#3A98B9", borderRadius: '15%', alignItems: 'center', borderColor: colors.primary, borderWidth: 3 }}>
                <Text h3 h3Style={{ marginTop: '5%', color: '#fff' }}>{GameTitle}</Text>
                <View style={{ width: '100%', flex: 1, alignItems: 'flex-start', marginTop: '10%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, width: '100%', height: '100%' }}>
                        <Text h4 style={styles.Text}>{GameLocation}</Text>
                        <Text h4 style={styles.Text}>{GameDate}</Text>
                        <Text h4 style={styles.Text}>{GameStartTime}-{GameEndTime}</Text>
                        <Text h4 style={styles.Text}>{GameLevel} Level</Text>
                        <Text h4 style={styles.Text}>{NumOfPlayers} players already in</Text>

                    </View>

                </View>
                <View style={{ width: '70%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <MapView
                        style={{ width: '120%', height: '80%', borderRadius: '15%' }}
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

                <View style={{ marginBottom: '20%' }}>
                    <Text style={styles.textstyle}>Please read carefully The Terms&Conditions and the Participation Waiver Before Registertation for a game! </Text>
                    <View style={{ alignItems: 'flex-start', paddingTop: '10%' }}>
                        <CheckBox
                            center
                            title={<Text style={{ color: 'white', fontSize: 30, textDecorationLine: 'underline', paddingLeft: 8 }} onPress={() => navigation.navigate('TermsAndCo')}>Terms&Conditions</Text>}
                            checked={toggleTermsCheckBox}
                            checkedColor={'white'}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => setToggleTermsCheckBox(!toggleTermsCheckBox)}
                        />
                        <CheckBox
                            center
                            title={<Text style={{ color: 'white', fontSize: 30, textDecorationLine: 'underline', paddingLeft: 8 }} onPress={() => navigation.navigate('Waiver')}>Waiver</Text>}
                            checked={toggleWaiverCheckBox}
                            checkedColor={'white'}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => setToggleWaiverCheckBox(!toggleWaiverCheckBox)}
                        />
                    </View>
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
        color: "#fff",
        fontFamily: colors.font,
        marginBottom: '3%'
    },
    textstyle: {
        color: "#fff",

        fontSize: 20,
        textAlign: 'center',
    }
})

export default CommunityGameDetails;