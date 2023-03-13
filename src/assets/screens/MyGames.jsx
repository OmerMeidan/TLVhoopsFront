import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { Text, View,ScrollView,StyleSheet,SafeAreaView } from 'react-native'
import GamesList from "../components/GamesList";
import axios from 'axios'
import TypeOfGamesSwitch from "../components/TypeOfGamesSwitch";
import { useNavigation } from "@react-navigation/native";
const MyGames = () => {
    const navigation = useNavigation()
    const [gamesTab, setGamesTab] = useState(1);
    const [UpcomingGamesArr,setUpcomingGamesArr] = useState([])
    const [pastGamesArr,setPastGamesArr]=useState([])
    const { setToken, token,PremiumGamesArr,setPremiumGamesArr,CommunityGamesArr,setCommunityGamesArr,emailToken,userDetails,setUserDetails,myGames,setMyGames  } = useContext(AuthContext);
    useEffect(()=>{
        const getPlayerGames = async()=>{
            try{
                const response = await axios.post('https://tlv-hoops-server.onrender.com/gameList',{})
                if(response.data){
                    console.log(userDetails.email);
                    setMyGames([])
                    setMyGames(prevState => [...prevState, response.data.filter(game=>(game.participants.find(player=>player===userDetails.email)))]);
                    seperateByDate()
                }
            }
            catch(error){
                console.log(error)
            }

        }
        const seperateByDate=()=>{
            setPastGamesArr([])
            setUpcomingGamesArr([])
            let today = new Date()
            console.log("games",myGames);
            myGames.map(incoming=>
                incoming.map( 
                    game=>{ 
                let year =game.date.toString().slice(4);
                let month = game.date.toString().slice(2, 4);
                let day = game.date.toString().slice(0, 2);
                let convertedDate = new Date(year + "-" + month + "-" + day)
                console.log(year + "-" + month + "-" + day);
                if (convertedDate.getTime() < today.getTime()) {
                        setPastGamesArr(prev =>[...prev,game])
                  } else if (convertedDate.getTime() > today.getTime()) {
                   
                        setUpcomingGamesArr(perv=>[...perv,game])
                  } else {
                        setUpcomingGamesArr(perv=>[...perv,game])
                    console.log("The user input date is the same as today's date.");
                  }

            }
                ))
        }
        getPlayerGames()
    },[])
    const onSelectSwitch = (value) => {
        setGamesTab(value);
      };
     
    return (
        <SafeAreaView style={styles.SafeAreaViewStyle} >
        {/* <View>
            {myGames.map((array,i)=>array.map((a,j)=><Text key={j}>{a.date}</Text>))} */}
            <View style={{ marginVertical: 20 }}>
          <TypeOfGamesSwitch
            selectionMode={1}
            option1="Upcomming Games"
            option2="Past Games"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        <ScrollView>
          {gamesTab == 1 &&
            UpcomingGamesArr.map((game, i) => (
              <GamesList
                key={i}
                location={game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                onPress={() => navigation.navigate('CommunityGameDetails', {
                  location: game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2'),
                  date: game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4),
                  startTime: game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1),
                  endTime: game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1),
                  numOfPlayers: game.participants.length
                })}
              />
            ))}
          {gamesTab == 2 &&
            pastGamesArr.map((game, i) => (
              <GamesList
                key={i}
                location={game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                onPress={() => navigation.navigate('PremiumGameDetails', {
                  location: game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2'),
                  date: game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4),
                  startTime: game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1),
                  endTime: game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1),
                  numOfPlayers: game.participants.length
                }
                )}
              />
            ))}
        </ScrollView>
        {/* </View> */}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    TopView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    SafeAreaViewStyle: {
      flex: 1,
    },
    ScrollViewStyle: {
      padding: 20,
    },
})

export default MyGames;
