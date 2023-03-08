import React, { useEffect, useState,useContext } from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
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
  const { setToken, token,PremiumGamesArr,setPremiumGamesArr,CommunityGamesArr,setCommunityGamesArr  } = useContext(AuthContext);
  const navigation = useNavigation()
  const [gamesTab, setGamesTab] = useState(1);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };
// [{"__v": 2,
// "_id": "64071627f97c9af6908db333",
//  "ageMax": 25,
//   "ageMin": 16,
//    "approved": false,
//     "createdByUser": "0532211390omar",
//      "date": 31122023,
//       "endTime": 2359,
//       "gameID": "31122023/300/HaHilazon3/1",
//        "level": "Intermediate",
//         "locationID": "HaHilazon3/1",
//          "maximumPlayers": 10,
//           "participants": [[Object], [Object]],
//            "price": 0, 
//            "startTime": 300,
//             "tlvpremium": false}]
useEffect(()=>{

},[CommunityGamesArr,PremiumGamesArr])
  return (
    <SafeAreaView style={styles.SafeAreaViewStyle} >
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.TopView}>
          <Text style={styles.HelloUserStyle}>Hello User.FirstName</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="person" size={50} color="#3A98B9" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.CarouselHeader}>SOMETHING</Text>
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
        <View style={{ marginVertical: 20 }}>
          <TypeOfGamesSwitch
            selectionMode={1}
            option1="Community Games"
            option2="Premium Games"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {gamesTab == 1 &&
          CommunityGamesArr.map((game,i) => (
            <GamesList
              key={i}
              location={game.locationID}
              date={game.date}
              startTime={game.startTime}
              endTime={game.endTime}
              onPress={() => navigation.navigate('CommunityGameDetails', { location: game.location, date: game.date, startTime: game.startTime, endTime: game.endTime })}
            />
          ))}
        {gamesTab == 2 &&
          PremiumGamesArr.map((game,i) => (
            <GamesList
              key={i}
              location={game.locationId}
              date={game.date}
              startTime={game.startTime}
              endTime={game.endTime}
              onPress={() => navigation.navigate('PremiumGameDetails', { location: game.location, date: game.date, startTime: game.startTime, endTime: game.endTime })}
            />
          ))}
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
    fontSize: 16,
    color: "#3A98B9",
  },
  CarouselHeader: {
    marginVertical: 15,
    flex: 1,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "#3A98B9",
  },
});

export default HomeScreen;
