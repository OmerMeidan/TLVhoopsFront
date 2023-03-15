import React, { useState, useEffect, useContext } from 'react';
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
    Linking,
    Button
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

import { useNavigation } from '@react-navigation/native';
import { Tab, TabView, Text } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'
import colors from '../../colors';
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { CheckBox } from '@rneui/themed';


function CommunityGameDetails({ route }) {
    const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails } = useContext(AuthContext);
    const { location, date, startTime, endTime, numOfPlayers, gameID } = route.params
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
    const [latitude, setLatitude] = useState(32.0872801)
    const [longitude, setLongitude] = useState(34.8040903)
    useEffect(() => {

        const getCord = async () => {
            const street = location.split(" ")[0]
            const streetNumber = location.split(" ")[1].split("/")[0]
            console.log(street, streetNumber, "ok");
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${streetNumber}+Tel Aviv,+IL&key=AIzaSyA5xU-SY93_xtrSnJMqbi_RT3yf9obFy00`)
                if (response.data) {
                    console.log(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng);
                    setLatitude(response.data.results[0].geometry.location.lat)
                    setLongitude(response.data.results[0].geometry.location.lng)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getCord()

    }, [])
    console.log(gameID);
    const handleRegisterForGame = async () => {
        if (toggleTermsCheckBox && toggleWaiverCheckBox) {

            try {

                const res = await axios.post('https://tlv-hoops-server.onrender.com/addPlayer', {
                    gameID: gameID,
                    player: userDetails.email
                })
                if (res.data) {
                    Alert.alert(
                        'Congrats!',
                        `You just registered! to the game in ${location}, ${date} , ${startTime}-${endTime}`,
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    console.log('OK')
                                    navigation.navigate('AppStack')
                                },
                            },
                        ],
                    )
                } else {
                    Alert.alert('Error', 'Failed to add player')
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to add player')
            }
        } else {
            Alert.alert(
                'ERROR!',
                'Please confirm Terms&Conditions and Waiver ',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log('OK')
                        },
                    },
                ],
            )
        }
    }




    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', textAlign:'center' }}>
            <View style={{ width: '95%', height: 700, backgroundColor: "#3A98B9", borderRadius: '20%', justifyContent:'center', textAlign:'center', alignItems:'center', borderColor: colors.primary, borderWidth: 3 }}>
                <Text h3 h3Style={{ paddingTop: '5%', color: '#fff' }}>{GameTitle}</Text>
                <View style={{ width: '100%', flex: 1, marginTop: '5%', flexDirection: 'row', justifyContent:'center', textAlign:'center', alignItems:'center' }}>
                    <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center' }}>
                        <Text style={styles.Text}>{GameLocation}</Text>
                        <Text style={styles.Text}>{GameDate}, {GameStartTime}-{GameEndTime} </Text>

                        <Text style={styles.Text}>{GameLevel} Level</Text>
                        <Text style={styles.Text}>{NumOfPlayers} players already in</Text>

                    </View>

                </View>
                <View style={{ width: '70%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <MapView
                        style={{ width: '120%', height: '80%', borderRadius: '15%' }}
                        maxZoomLevel={20}
                        region={{
                            latitude: `${latitude}`,
                            longitude: `${longitude}`,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421,
                        }}>
                        <Marker
                            coordinate={{ latitude: `${latitude}`, longitude: `${longitude}` }}
                            image={require('../../040ca4b7d907fc901da64c5015740a13-removebg-preview-removebg-preview.png')}
                        />
                    </MapView>
                    {/* <Button title='Open Maps' titleStyle={{}}  onPress={() => { Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}&`) }} /> */}


                    <TouchableOpacity onPress={() => { Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}&`) }} style={styles.mapsButton}>
                        <Text style={styles.mapbuttonText}>Open Maps</Text>
                    </TouchableOpacity>

                </View>




                <View style={{ marginTop: '10%' }}>
                    <Text style={styles.textstyle}>Please read carefully The Terms&Conditions and the Participation Waiver Before Registertation for a game! </Text>
                    <View style={{ alignItems: 'flex-start', paddingTop: '10%' }}>
                        <CheckBox
                            center
                            title={<Text style={{ color: 'white', fontSize: 20, textDecorationLine: 'underline', paddingLeft: 8 }} onPress={() => navigation.navigate('TermsAndCo')}>Terms&Conditions</Text>}
                            checked={toggleTermsCheckBox}
                            checkedColor={'white'}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => setToggleTermsCheckBox(!toggleTermsCheckBox)}
                        />
                        <CheckBox
                            center
                            title={<Text style={{ color: 'white', fontSize: 20, textDecorationLine: 'underline', paddingLeft: 8 }} onPress={() => navigation.navigate('Waiver')}>Waiver</Text>}
                            checked={toggleWaiverCheckBox}
                            checkedColor={'white'}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => setToggleWaiverCheckBox(!toggleWaiverCheckBox)}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { handleRegisterForGame() }} style={styles.button}>
                        <Text style={styles.buttonText}>JOIN GAME!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    Text: {
        color: "#fff",
        fontFamily: colors.font,
        marginBottom: '3%',
        fontSize: 16,
        fontWeight: '600',
        textAlign:'center', 
    },
    textstyle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: '800',
        textAlign: 'center',
        margin:'5%'
    },
    buttonText: {
        textAlign: 'center',
        color: "#3A98B9",
        fontSize: 30
    },
    mapbuttonText: {
        textAlign: 'center',
        color: "#3A98B9",
        fontSize: 13
    },
    button: {
        backgroundColor: "#fff",
        padding: 10,
        width: "60%",
        borderRadius: 15,
        textAlign: 'center', 
        marginBottom:'2%'

    },
    mapsButton: {
        backgroundColor: "#fff",
        padding: 5,
        width: "40%",
        borderRadius: 15,
        textAlign: 'center',
        marginTop: '3%'

    },
    openMapsButton: {
        textAlign: 'center',
        color: "#3A98B9",
        fontSize: 50
    }
})

export default CommunityGameDetails;