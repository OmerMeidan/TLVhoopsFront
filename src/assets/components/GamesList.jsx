import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { windowWidth } from "../utilis/Dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import PremiumGameDetails from "../screens/PremiumGameDetails";

const GamesList = ({ location, date, startTime, endTime, onPress, gameID }) => {
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

      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor:'#fff',
          padding: 10,
          width: '20%',
          borderRadius: 15,
        }}
      >
        <Text 
        
          style={{
            color: "#3A98B9",
            textAlign: "center",
            fontSize: 13,
          
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GamesList;
