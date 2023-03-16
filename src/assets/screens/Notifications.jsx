import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Title, } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import RequestGameCard from '../components/RequestGameCard';
import LottieView from 'lottie-react-native';
import axios from 'axios'
const Notifications = () => {
    const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails } = useContext(AuthContext);
    const [myGames, setMyGames] = useState([])
    const [allGames,setAllGames]=useState([])
    const [x,setX]=useState([])
    const handleApprovedReq=async(id,email)=>{
        try{
            const response = await axios.post('https://tlv-hoops-server.onrender.com/approveRequest',{
                gameID:id,
                player:email
            })
            if(response.data){
                console.log(response.status)
            }
        }
        catch(error){
            console.log(error)
        }

    }
    const handleRejectReq=async(id,email)=>{
        try{
            const response = await axios.post('https://tlv-hoops-server.onrender.com/rejectRequest',{
                gameID:id,
                player:email
            })
            if(response.data){
                console.log(response.status)
            }
        }
        catch(error){
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
        setTimeout(getPlayerGames,3000)
    }, [])


   
// console.log(x)

console.log(myGames)

// console.log(allGames)
    return (
        <SafeAreaView style={styles.SafeAreaViewStyle} >
        <ScrollView style={styles.ScrollViewStyle}>
          {
            allGames.filter(game => myGames.includes(game.gameID))
            .map((game,i) =>
              <RequestGameCard
                key={i}
                location={game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                onPressA={() => handleApprovedReq(game.gameID,userDetails.email)}
                onPressB={()=>handleRejectReq(game.gameID,userDetails.email)}
              />
            )
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
        height:'100%',
        backgroundColor: '#3A98B9'
    },
    ScrollViewStyle: {
        padding: 20,
        height:'100%',
    },
        backgroundColor:'#3A98B9'
      },
)