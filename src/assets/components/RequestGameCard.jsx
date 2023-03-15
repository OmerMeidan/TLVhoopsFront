import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { windowWidth } from "../utilis/Dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import PremiumGameDetails from "../screens/PremiumGameDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
// <ion-icon name="checkmark-circle-outline"></ion-icon>
// <ion-icon name="close-circle-outline"></ion-icon>
const RequestGameCard = ({ location, date, startTime, endTime, onPressA, gameID,onPressB }) => {

    
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,

      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <MaterialIcons
          name="sports-basketball"
          size={40}
          color="#fff"
          style={{ borderRadius: 10, marginRight: 8 }}
        />
        <View style={{ width: windowWidth - 180 }}>
          <Text
            numberOfLines={1}
            style={{
              color: "#fff",
              fontSize: 13,
              textTransform: "uppercase",
            }}
          >
            {location} 
          </Text>
          <Text style={{ color: "#fff", fontSize: 13 }}>
           {date},  {startTime} - {endTime}
          </Text>
        </View>
      </View>

      
      <TouchableOpacity  onPress={onPressA}>
          <Ionicons
            name="checkmark-circle-outline"
            size={40}
            color="#fff"
            style={{ marginRight: 15 }}
          />
          </TouchableOpacity>
      <TouchableOpacity onPress={onPressB}>
          <Ionicons
            name="close-circle-outline"
            size={40}
            color="#fff"
            style={{ marginRight: 15 }}
          />
          </TouchableOpacity>
    </View>
  );
};

export default RequestGameCard;
