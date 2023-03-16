import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native'
import { Text } from '@rneui/themed';
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import LottieView from 'lottie-react-native';
const PlayersList = ({ route }) => {
    const { gameID } = route.params;
    const [allPlayers, setallPlayers] = useState([])
    const [GameToList, setGameToList] = useState({})
    useEffect(() => {
        const getPlayers = async () => {

            try {
                const response = await axios.post('https://tlv-hoops-server.onrender.com/gameList', {})
                if (response.data) {
                    setGameToList(response.data.find(game => game.gameID === gameID))
                }

            } catch (error) {
                console.log(error)
            }
        }
        getPlayers()
    }, [])

    useEffect(() => {
        const findNames = async () => {

            try {
                const response = await axios.post('https://tlv-hoops-server.onrender.com/playerList', {})
                if (response.data) {

                }

            } catch (error) {
                console.log(error)
            }
        }
        findNames()
    }, [GameToList])
    console.log(gameID)
    const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.SafeAreaViewStyle}>
            <ScrollView style={styles.ScrollViewStyle}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={styles.Header}>Players Already in the Game</Text>
                </View>

                {GameToList.participants && GameToList.length!=0?
                    GameToList.participants.map((participant, index) => (
                        <Text key={index} style={styles.Text}>
                            {participant}
                        </Text>
                    )) :
                    <View style={{ height: '100%', width: '100%', alignItems: 'center', paddingTop: '25%' }}>
                        <LottieView style={{ height: '100%', width: '100%' }}
                            source={require('../58686-basketball (1).json')}
                            loop
                            autoPlay
                        />
                        <Text h2 h2Style={{ color: 'white', fontFamily: 'Gill Sans' }}>There's still no players in...</Text>
                    </View>
                }
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlayersList

const styles = StyleSheet.create({
    SafeAreaViewStyle: {
        flex: 1,
        backgroundColor: '#3A98B9',
    },
    ScrollViewStyle: {
        padding: 20,
    },
    Header: {
        fontSize: 24,
        fontWeight: '600',
        color: "#fff",
        padding: 10,
    },
    Text: {
        fontSize: 20,
        fontWeight: '400',
        color: "#fff",
        paddingTop: 15,
        padding: 4
    },
})