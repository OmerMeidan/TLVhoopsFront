import { StyleSheet, ScrollView, SafeAreaView, View, Alert,RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Title, } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import RequestGameCard from '../components/RequestGameCard';
import LottieView from 'lottie-react-native';
import axios from 'axios'
import { Tab, TabView, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
const Notifications = () => {
    const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails, notificationCount, setNotificationCount, isRing, setIsRing } = useContext(AuthContext);
    const [myGames, setMyGames] = useState([])
    const navigation = useNavigation()
    const [allGames, setAllGames] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const handleApprovedReq = async (id, email) => {
        try {
            const response = await axios.post('https://tlv-hoops-server.onrender.com/approveRequest', {
                gameID: id,
                player: email
            })
            if (response.data) {
                Alert.alert("Congrats!", "You've just joined a game!",
                    [
                        {
                            text: 'Take me to my games',
                            onPress: () => navigation.navigate("My Games")
                        },
                        {
                            text: 'Take me to home page',
                            onPress: () => navigation.navigate("Home")
                        }
                    ])
                console.log(response.status)
            }
        }
        catch (error) {
            Alert.alert("Sorry!", "Something went wrong!",
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate("Home")
                    }
                ])
            console.log(error)
        }

    }
    
    const handleRejectReq = async (id, email) => {
        try {
            const response = await axios.post('https://tlv-hoops-server.onrender.com/rejectRequest', {
                gameID: id,
                player: email
            })
            if (response.data) {
                console.log(response.status)
                 Alert.alert("Ok!", "You've just rejected this invite!",
                    [
                        {
                            text: 'Take me to my games',
                            onPress: () => navigation.navigate("My Games")
                        },
                        {
                            text: 'Take me to home page',
                            onPress: () => navigation.navigate("Home")
                        }
                    ])
            }
        }
        catch (error) {
            Alert.alert("Sorry!", "Something went wrong!",
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate("Home")
                    }
                ])
            console.log(error)
        }

    }
    useEffect(() => {
        const getPlayerGames = async () => {
            try {
                setMyGames([]);
                const response = await axios.post('https://tlv-hoops-server.onrender.com/gameList', {});
                if (response.data) {
                    setAllGames(response.data)
                    const matchingGameIDs = response.data.filter(game => userDetails.requests.some(req => req.gameID === game.gameID)).map(game => game.gameID);
                    setMyGames(matchingGameIDs);

                }

            } catch (error) {
                console.log(error);
            }

        }


        getPlayerGames()
        const intervalId = setInterval(getPlayerGames, 10000);
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if (myGames.length > 0) {
            console.log("hi")
            setIsRing(true)
            setNotificationCount(myGames.length)
        } else {
            setIsRing(false)
        }
    }, [myGames])


    // console.log(x)

    console.log(myGames)



    // console.log(allGames)
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3A98B9" }}>
            <ScrollView style={styles.ScrollViewStyle}>
                <View style={{ width: '100%', alignItems: 'center',marginBottom:'5%' }}>
                    <Text h2 h2Style={{ color: '#fff', alignItems: 'center' }}>My Invites</Text>
                </View>
                {myGames.length != 0 ?
                    allGames.filter(game => myGames.includes(game.gameID))
                        .map((game, i) =>
                            <RequestGameCard
                                key={i}
                                location={game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                                onPressA={() => handleApprovedReq(game.gameID, userDetails.email)}
                                onPressB={() => handleRejectReq(game.gameID, userDetails.email)}
                            />
                        ) :
                    <View style={{ height: '100%', width: '100%', alignItems: 'center', paddingTop: '25%' }}>
                        <LottieView style={{ height: '100%', width: '100%' }}
                            source={require('../58686-basketball (1).json')}
                            loop
                            autoPlay
                        />
                        <Text h2 h2Style={{ color: 'white', fontFamily: 'Gill Sans' }}>No Pending Requests...</Text>
                    </View>
                }
            </ScrollView>

        </SafeAreaView>
    )

}

export default Notifications

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        margin: 37
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    SafeAreaViewStyle: {
        flex: 1,
        height: '100%',
        backgroundColor: '#3A98B9',
        width: '100%'
    },
    ScrollViewStyle: {
        padding: 20,
        height: '100%',
        backgroundColor: '#3A98B9',
        width: '100%',
    },
        backgroundColor:'#3A98B9'
      },
)