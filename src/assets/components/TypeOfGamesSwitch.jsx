import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function TypeOfGamesSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: "100%",
        backgroundColor: "#3A98B9",
        borderRadius: 10,
        borderColor: "#3A98B9",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? "#3A98B9" : "#fff",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >


        
        <Text
          style={{
            color: getSelectionMode == 1 ? "#3A98B9" :  "white",
            fontSize: 14,
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? "#3A98B9" : "#fff",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 1 ? "white" : "#3A98B9",
            fontSize: 14,
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
