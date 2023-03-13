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
import {Carousel} from 'react-native-auto-carousel';


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





  const sliderData = [require('../images/sliderData1.jpeg'), require('../images/slideroption2.jpg')]


  // console.log(userDetails);
  // console.log(CommunityGamesArr);
  return (
    <SafeAreaView style={styles.SafeAreaViewStyle} >
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.TopView}>
  
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../images/DemoLogo.jpeg')}
              style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
        </View>
        {/* <View>
          <Text style={styles.CarouselHeader}>FOR THE BASKETBALL COMMUNITY</Text>
        </View> */}
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SliderBox images={sliderData} dotColor='white' inactiveDotColor='grey' autoplay={true} autoplayInterval={5000} circleLoop={true}  ImageComponentStyle={{borderRadius: 20, width:'90%' }} paginationBoxStyle={{marginright:'20%'}}/>
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
            CommunityGamesArr.map((game, i) => (
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
            PremiumGamesArr.map((game, i) => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TopView: {
    flexDirection: "row",
    flex:1,
    alignItems:'center',
justifyContent:'center',
    marginBottom:20,

  },
  SafeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#3A98B9'
  },
  ScrollViewStyle: {
    padding: 20,
  },
  HelloUserStyle: {
    fontSize: 20,
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
    borderRadius: 20,
    textAlign: 'center',

  }
});

export default HomeScreen;
