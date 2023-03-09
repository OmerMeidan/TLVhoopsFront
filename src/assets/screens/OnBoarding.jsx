import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground, Dimensions
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../colors";
import { useWindowDimensions } from 'react-native';

const OnBoarding = ({ navigation }) => {
  const screenDimensions = Dimensions.get('screen');
  return (
    <ImageBackground source={require('../images/onBoardingImage.png')} resizeMode='cover' style={{ flex: 1 }} >
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

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
    borderRadius: 5,
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
    borderRadius: 5,
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
