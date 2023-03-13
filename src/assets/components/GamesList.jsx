import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { windowWidth } from "../utilis/Dimensions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import PremiumGameDetails from "../screens/PremiumGameDetails";

const GamesList = ({ location, date, startTime, endTime, onPress }) => {

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
        <View style={{ width: windowWidth - 220 }}>
          <Text
            numberOfLines={1}
            style={{
              color: "#fff",
              fontSize: 13,
              textTransform: "uppercase",
            }}
          >
            {location} , {date}
          </Text>
          <Text style={{ color: "#fff", fontSize: 13 }}>
            {startTime} - {endTime}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "#3A98B9",
          padding: 10,
          width: 90,
          borderRadius: 20,
        }}
      >
        <Text 
        
          style={{
            color: "#fff",
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
