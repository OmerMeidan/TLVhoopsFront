import React, { useEffect, useState } from "react";
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
const HomeScreen = () => {
  const navigation = useNavigation()
  const [gamesTab, setGamesTab] = useState(1);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };

  useEffect(() => {

  }, [])
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
          CommunityGames.map((game) => (
            <GamesList
              key={game.id}
              location={game.location}
              date={game.date}
              startTime={game.startTime}
              endTime={game.endTime}
              onPress={() => navigation.navigate('CommunityGameDetails', { location: game.location, date: game.date, startTime: game.startTime, endTime: game.endTime })}
            />
          ))}
        {gamesTab == 2 &&
          PremiumGames.map((game) => (
            <GamesList
              key={game.id}
              location={game.location}
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
