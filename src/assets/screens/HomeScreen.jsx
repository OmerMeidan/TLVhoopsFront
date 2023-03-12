import React, { useEffect, useState, useContext } from "react";
import { Text, View, SafeAreaView, ScrollView,Image,StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Carousel from "react-native-snap-carousel";
import { sliderData, CommunityGames, PremiumGames } from "../model/data";
import BannerSlider from "../components/BannerSlider";
import { windowWidth } from "../utilis/Dimensions";
import TypeOfGamesSwitch from "../components/TypeOfGamesSwitch";
import GamesList from "../components/GamesList";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../context/AuthContext';

import axios from 'axios'
const HomeScreen = () => {
  const navigation = useNavigation()
  const [gamesTab, setGamesTab] = useState(1);

  
  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };
  const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails } = useContext(AuthContext);
  useEffect(() => {
    //final result - 2 arrays that have all of the community and premium games inside.
    const GetAllGames = async () => {
      try {
        setCommunityGamesArr([]);
        setPremiumGamesArr([]);
        const response = await axios.post('https://tlv-hoops-server.onrender.com/gameList', {})
        if (response.data) {
          console.log('games', response.data)
          response.data.forEach(game => {
            if (game.tlvpremium) {
              console.log(game);
              setPremiumGamesArr(prevState => [...prevState, game]);
            } else {
              setCommunityGamesArr(prevState => [...prevState, game]);
            }
          })
        }

      }

      catch (error) {
        console.log(error)
      }

    }

    const GetUserDetail = async () => {
      try {
        const response = await axios.post('https://tlv-hoops-server.onrender.com/playerList', {})
        if (response.data) {
          setUserDetails(response.data.find(user => user.email === emailToken))
        }

      }
      catch (error) {
        console.log(error)
      }
    }

    GetUserDetail()
    GetAllGames()
  }, [])







  console.log(PremiumGamesArr);
  // console.log(CommunityGamesArr);
  return (
    <SafeAreaView style={styles.SafeAreaViewStyle} >
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.TopView}>
          <Text style={styles.HelloUserStyle}>Hello {userDetails && userDetails.firstName}!</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../images/DemoLogo.jpeg')}
                    style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.CarouselHeader}>FOR THE BASKETBALL COMMUNITY</Text>
        </View>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
          scrollAnimationDuration={1000}
          autoPlay
        />

        
        <View style={{
          paddingTop:'7%',
          justifyContent: 'center',
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.button}>
          <Text style={styles.textInput}>New For TLV-HOOPS? Tap here for read About the Community and the Premium Games!</Text>
          </TouchableOpacity>
        </View>


        <View style={{ marginVertical: 20 }}>
          <TypeOfGamesSwitch
            selectionMode={1}
            option1="Community Games"
            option2="Premium Games"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        <ScrollView>
          {gamesTab == 1 &&
            CommunityGamesArr.map((game, i) => (
              <GamesList
                key={i}
                location={game.locationID.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                onPress={() => navigation.navigate('CommunityGameDetails', {
                  location: game.locationID.replace(/([a-zA-Z])(\d+)/, '$1 $2'),
                  date: game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4),
                  startTime: game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1),
                  endTime: game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1),
                  numOfPlayers: game.participants.length
                })}
              />
            ))}
          {gamesTab == 2 &&
            PremiumGamesArr.map((game, i) => (
              <GamesList
                key={i}
                location={game.locationID.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                onPress={() => navigation.navigate('PremiumGameDetails', {
                  location: game.locationID.replace(/([a-zA-Z])(\d+)/, '$1 $2'),
                  date: game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4),
                  startTime: game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1),
                  endTime: game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1),
                  numOfPlayers: game.participants.length
                }
                )}
              />
            ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  HelloUserStyle: {
    fontSize: 20,
    color: "#3A98B9",
    fontWeight:'400'
  },
  CarouselHeader: {
    marginVertical: 15,
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#3A98B9",
  },
  textInput: {
 
    color: '#fff',
    backgroundColor:'#3A98B9',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:"600"

  },
  button: {
    backgroundColor: '#3A98B9',
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',

  }
});

export default HomeScreen;
