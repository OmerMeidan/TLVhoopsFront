import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { View,ScrollView,StyleSheet,SafeAreaView } from 'react-native'
import GamesList from "../components/GamesList";
import axios from 'axios'
import TypeOfGamesSwitch from "../components/TypeOfGamesSwitch";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import { Tab, TabView, Text, Button } from '@rneui/themed';


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
                }
            }
            catch(error){
                console.log(error)
            }

        }
        
        getPlayerGames()
        return(
            getPlayerGames()
        )
    },[])

    useEffect(()=>{
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
        seperateByDate()

    },[myGames])
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
           UpcomingGamesArr.length!==0?
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
            ))
            :
            gamesTab == 1 &&
            <View style={{height:'100%',width:'100%',alignItems:'center'}}>
            <LottieView style={{height:'100%',width:'100%'}}
                source={require('../58686-basketball (1).json')}
                loop
                autoPlay
            />
            <Text h2 h2Style={{color:'white',fontFamily:'Gill Sans'}}>nothing to show here</Text>
        </View>
        }
          {gamesTab == 2 &&
           pastGamesArr.length!==0?
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
            ))
            :
            gamesTab == 2 && 
            <View style={{height:'100%',width:'100%',alignItems:'center'}}>
                <LottieView style={{height:'100%',width:'100%'}}
                    source={require('../58686-basketball (1).json')}
                    loop
                    autoPlay
                />
                <Text h2 h2Style={{color:'white',fontFamily:'Gill Sans'}}>nothing to show here</Text>
            </View>
            
            }
        </ScrollView>
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
      backgroundColor: '#3A98B9'
    },
    ScrollViewStyle: {
      padding: 20,
    },
})

export default MyGames;
