import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const OnBoarding = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeader: {
    fontSize: 28,
    fontWeight: "900",
    color: "#3A98B9",
    marginTop: 20,
    marginRight: 210,
  },
  letsHoopButton: {
    backgroundColor: "#3A98B9",
    padding: 20,

    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  letsHoopButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default OnBoarding;
