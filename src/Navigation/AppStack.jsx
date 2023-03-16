
import React, { useEffect, useContext,useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import ViewProfile from "../assets/screens/ViewProfile";
import PostAGame from "../assets/screens/PostAGame";
import About from "../assets/screens/About";
import Notifications from '../assets/screens/OnBoarding'
import ContactUs from "../assets/screens/ContactUs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../assets/components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import colors from "../colors";
import { Badge } from "@rneui/themed";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const [myGames, setMyGames] = useState([])
  const [allGames, setAllGames] = useState([])
  const {notificationCount,setNotificationCount,isRing,setIsRing,userDetails}=useContext(AuthContext)  
  const navigation = useNavigation()

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


console.log(isRing)
  return (

    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} drawer screenOptions={{
      headerTintColor: '#fff',
      headerTitle: '', headerStyle: { backgroundColor: "#3A98B9" },
      drawerLabelStyle: { marginLeft: -25, fontSize: 15, fontFamily: colors.font },
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
        >
          <Badge
            value={notificationCount}
            containerStyle={{ position: "absolute", top: -5, left: 10,zIndex:'1' }}
            badgeStyle={{ backgroundColor: "red",display:isRing?'block':'none' }}
            />
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#fff"
              style={{ marginRight: 15 }}
            />
        </TouchableOpacity>
      </View>
      ),
    }}>
      <Drawer.Screen component={TabNavigator} name="Home Screen" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        ),
        drawerLabelStyle: { fontFamily: colors.font, marginLeft: -25, fontSize: 15 },
      }} />


      <Drawer.Screen component={ViewProfile} name="View Profile" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={PostAGame} name="Post A Game " options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="add" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={About} name="About" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="information-circle-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen component={ContactUs} name="Contact Us" options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="call-outline" size={22} color={color} />
        )
      }} />

    </Drawer.Navigator>

  );
};

export default AppStack;
