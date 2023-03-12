import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground, Dimensions, Animated, Easing
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../colors";
import { useWindowDimensions } from 'react-native';
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from '../../Constans';


const OnBoarding = ({ navigation }) => {
  const screenDimensions = Dimensions.get('screen');

  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <View style={styles.container}>
      <AnimetedImage
        resizeMode="repeat"
        style={[styles.background, {
          transform: [
            {
              translateX: translateAnimation,
            },
            {
              translateY: translateAnimation,
            },
          ],
        }]}
        source={require('../images/boardingg.jpg')} />
      <View style={styles.container}>
        <View style={styles.mainHeaderButton}>
          <Text style={styles.mainHeader}>TLV-HOOPS</Text>
          <StatusBar style="auto" />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: -550,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.letsHoopButton}
          >
            <Text style={styles.letsHoopButtonText}>Let's Hoop!</Text>
            <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: 1100,
    height: 1100,
    top: 0,
    opacity: 1,
    transform: [
      {
        translateX: 10,
      },
      {
        translateY: 10,
      },
    ],
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: colors.font
  },

  mainHeaderButton: {
    backgroundColor: "#3A98B9",
    padding: 10,
    width: "40%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: '50%',
    marginTop: '10%'

  },
  mainHeader: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    textAlign: 'center'
  },
  letsHoopButton: {
    backgroundColor: "#3A98B9",
    padding: 10,
    width: "90%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",



  },
  letsHoopButtonText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    textAlign: 'center'
  },
});

export default OnBoarding;
