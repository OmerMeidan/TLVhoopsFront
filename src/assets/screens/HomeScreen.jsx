import React, { useEffect, useState, useContext } from "react";
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


import BannerSlider from "../components/BannerSlider";
import { windowWidth } from "../utilis/Dimensions";
import TypeOfGamesSwitch from "../components/TypeOfGamesSwitch";
import GamesList from "../components/GamesList";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../context/AuthContext';
import { SliderBox } from 'react-native-image-slider-box'
import { Dimensions } from 'react-native';

import axios from 'axios'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [gamesTab, setGamesTab] = useState(1);


  const renderBanner = ({ image, index }) => {
    return <BannerSlider data={image} />;
  };

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };

  const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails } = useContext(AuthContext);
  useEffect(() => {
    const GetAllGames = async () => {
      try {
        setCommunityGamesArr([]);
        setPremiumGamesArr([]);
        const response = await axios.post('https://tlv-hoops-server.onrender.com/gameList', {})
        if (response.data) {


          response.data.forEach(game => {
            if (game.tlvpremium) {
       

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
    setTimeout(GetAllGames,3000)
  }, [])





  const sliderData = [require('../images/slideroption1.jpeg'), require('../images/slideroption2.jpg'), require('../images/slideroption3.jpeg')]


  // console.log(userDetails);
  // console.log(CommunityGamesArr);
  return (
    <SafeAreaView style={styles.SafeAreaViewStyle} >
      <ScrollView style={styles.ScrollViewStyle}>
        <View>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.TopView}>
              <Text style={styles.HelloUserStyle}>Welcome,  {userDetails.firstName} !</Text>
              <Image source={require('../images/DemoLogo.jpeg')}
                style={{ width: 100, height: 100 }} />
            </View>
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <SliderBox images={sliderData} dotColor='white' inactiveDotColor='grey' autoplay={true} autoplayInterval={6000} circleLoop={true} ImageComponentStyle={{ borderRadius: 15, width: '90%' }} paginationBoxStyle={{ }} />
        </View>
        <View style={{
          paddingTop: '7%',
          justifyContent: 'center',
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.button}>
            <Text style={styles.textInput}>New For TLV-HOOPS? Tap here for read About the Community and the Premium Games!</Text>
          </TouchableOpacity>
        </View>



        <View style={{ marginVertical: 20, backgroundColor: '#3A98B9' }}>
          <TypeOfGamesSwitch
            selectionMode={1}
            option1="Community Games"
            option2="Premium Games"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        <ScrollView style={{ color: 'white', backgroundColor: '#3A98B9' }}>
          {gamesTab == 1 &&
            CommunityGamesArr.sort((a, b) => new Date(a.date.toString().slice(4) +"-"+a.date.toString().slice(2, 4)+"-"+a.date.toString().slice(0, 2)) - new Date(b.date.toString().slice(4) +"-"+b.date.toString().slice(2, 4)+"-"+b.date.toString().slice(0, 2))).map((game, i) => (
              <GamesList
                key={i}
                location={game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                gameID={game.gameID}
                onPress={() => navigation.navigate('CommunityGameDetails', {
                  location: game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2'),
                  date: game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4),
                  startTime: game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1),
                  endTime: game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1),
                  numOfPlayers: game.participants.length,
                  gameID: game.gameID
                })}
              />
            ))}
          {gamesTab == 2 &&
            PremiumGamesArr.sort((a, b) => new Date(a.date.toString().slice(4) +"-"+a.date.toString().slice(2, 4)+"-"+a.date.toString().slice(0, 2)) - new Date(b.date.toString().slice(4) +"-"+b.date.toString().slice(2, 4)+"-"+b.date.toString().slice(0, 2))).map((game, i) => (
              <GamesList
                key={i}
                location={game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2')}
                date={game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4)}
                startTime={game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1)}
                endTime={game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1)}
                gameID={game.gameID}
                onPress={() => navigation.navigate('PremiumGameDetails', {
                  location: game.address.replace(/([a-zA-Z])(\d+)/, '$1 $2'),
                  date: game.date.toString().substr(0, 2) + '/' + game.date.toString().substr(2, 2) + '/' + game.date.toString().substr(4, 4),
                  startTime: game.startTime.toString().length > 3 ? game.startTime.toString().slice(0, 2) + ":" + game.startTime.toString().slice(2) : game.startTime.toString().slice(0, 1) + ":" + game.startTime.toString().slice(1),
                  endTime: game.endTime.toString().length > 3 ? game.endTime.toString().slice(0, 2) + ":" + game.endTime.toString().slice(2) : game.endTime.toString().slice(0, 1) + ":" + game.endTime.toString().slice(1),
                  numOfPlayers: game.participants.length,
                  gameID: game.gameID
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
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,

  },
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#3A98B9'
  },
  ScrollViewStyle: {
    padding: 20,
  },
  HelloUserStyle: {
    fontSize: 22,
    fontWeight: '600',
    color: "#fff",
    fontWeight: '400'
  },
  CarouselHeader: {
    marginVertical: 15,
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  textInput: {

    color: '#3A98B9',
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "600"

  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',

  }
});

export default HomeScreen;
