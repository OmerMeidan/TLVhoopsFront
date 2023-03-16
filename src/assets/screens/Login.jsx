import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  View,
  InputField, TouchableOpacity, Image,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios'
import { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Tab, Text, TabView, } from '@rneui/themed';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../colors';
import { Dimensions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';



export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

function Login() {
  const { setToken, token, setEmailToken, emailToken } = useContext(AuthContext);

  //login inputs
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  //sign up inputs
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [registerPosition, setRegisterPosition] = useState('')
  const [registerHeight, setRegisterHeight] = useState('')
  const [registerBirthDate, setRegisterBirthDate] = useState('')
  const [BirthDateValue, setBirthDateValue] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')

  //other useStates
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [def, setDefault] = useState('')
  const [index, setIndex] = useState(0)

  const navigation = useNavigation()


  const handleLogIn = async () => {
    try {
      const lowerEmail = email.toLowerCase()
      const res = await axios.post('https://tlv-hoops-server.onrender.com/login', {
        lowerLoginEmail: lowerEmail,
        loginPass: password
      })
      if (res.data) {
        setToken(res.data.token)
        await AsyncStorage.setItem('token', token);
        if (AsyncStorage.getItem('token')) {
          setEmailToken(lowerEmail)
          Alert.alert("Welcome!", "You just loged in!", [{ text: 'ok', onPress: () => console.log("ok") }])
          navigation.navigate('AppStack')
        }
        console.log(res.data.token)
      }
    }
    catch (error) {
      Alert.alert("User doesn't exist!")
      console.log(error)
    }
  }



  useEffect(() => {
    if (index == 1) setTimeout(() => { setIsLoading(true) }, 650)
    else setIsLoading(false)
  }, [index]);




  //signup checking
  const handleSignUp = async () => {
    if (registerPassword === registerConfirmPassword) {
      const lowerEmail = registerEmail.toLowerCase();
      try {
        const res = await axios.post('https://tlv-hoops-server.onrender.com/signup', {
          firstName: registerFirstName,
          lastName: registerLastName,
          email: lowerEmail,
          password: registerPassword,
          birthDate: registerBirthDate,
          phoneNumber: registerPhone,
          preferredPosition: registerPosition,
          height: registerHeight
        });
        if (res.status === 200) {
          console.log(res.data);
          setDefault("");
          Alert.alert("Congrats!", "You Just Signed Up!", [{ text: 'OK', onPress: () => setDefault("") }]);
        }

      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 409:
              Alert.alert("Email is already in use! Please try another email.");
              break;
            case 408:
              Alert.alert("Phone number is already in use! Please try another phone number.");
              break;
            default:
              Alert.alert("An error occurred while signing up. Please try again later.");
          }
        } else {
          Alert.alert("An error occurred while signing up. Please try again later.");
        }
      }
    }
    else {
      Alert.alert("Passwords do not match. Please try again.");
    }
  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Convert the date to a string
    const dateString = date.toISOString();
    console.log(dateString);

    // Extract the year, month, and day values from the date string
    const [year, month, day] = dateString.split('T')[0].split('-');
    console.log(year);
    console.log(month);
    console.log(day);

    // Set the state variables for year, month, and day
    setRegisterBirthDate(day + month + year)
    setBirthDateValue(day + "/" + month + "/" + year)
    hideDatePicker();
  };


  return (

    <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#3A98B9' }}>

      <SafeAreaView style={{ backgroundColor: '#3A98B9' }}>
        <StatusBar style={styles.container} />
      </SafeAreaView>
      <TabView value={index} onChange={setIndex} animationType="spring">


        <TabView.Item style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
          <SafeAreaView style={styles.homePage}>
            <Image source={require('../images/DemoLogo.jpeg')}
              style={{ width: "30%", height: "17%" }} />

            <SafeAreaView style={{ justifyContent: 'flex-start' }}>

            </SafeAreaView>
            <SafeAreaView style={styles.LoginPage}>

       
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                  <TextInput
                    placeholder='User email'
                    placeholderTextColor='#8c9393'
                    onChangeText={(value) => setEmail(value)}
                    style={styles.textInput}
                  />
                </View>



                <View style={styles.inputContainer}>
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                  <TextInput placeholder='Password' placeholderTextColor={'#8c9393'} secureTextEntry={true} autoCapitalize='none' onChangeText={(value) => setPassword(value)} style={styles.textInput} />
                </View>
             
            </SafeAreaView>
            <TouchableOpacity onPress={() => { handleLogIn() }} style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TabView.Item>


        <TabView.Item style={{ backgroundColor: '#3A98B9', width: '100%', height: '100%' }}>
          {!isLoading ?
            <LottieView
              source={require('../32960-loader-basketball (2).json')}
              loop
              autoPlay
            />
            :<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={{ backgroundColor: '#3A98B9' }}>
              <SafeAreaView style={styles.SignUpPage}>
                <SafeAreaView style={{ justifyContent: 'flex-start', backgroundColor: '#3A98B9', }}>
                  <Image source={require('../images/DemoLogo.jpeg')}
                    style={{ width: 130, height: 130 }} />
                </SafeAreaView>
                <TextInput defaultValue={`${def}`} placeholder='first name' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterFirstName(value)} style={styles.textInput} />
                <TextInput defaultValue={`${def}`} placeholder='last name' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterLastName(value)} style={styles.textInput} />
                <TextInput defaultValue={`${def}`} placeholder='email' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterEmail(value)} style={styles.textInput} />
                <TextInput defaultValue={`${def}`} placeholder='password' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterPassword(value)} style={styles.textInput} />
                <TextInput defaultValue={`${def}`} placeholder='confirm password' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterConfirmPassword(value)} style={styles.textInput} />
                <TextInput onPressIn={() => showDatePicker()} defaultValue={`${BirthDateValue}`} placeholder='birth date' onChangeText={(value) => setRegisterBirthDate(value)} style={styles.textInput} placeholderTextColor={'#8c9393'} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  maximumDate={new Date(2006, 11, 31)}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <TextInput defaultValue={`${def}`} placeholder='phone number' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterPhone(value)} style={styles.textInput} />
                <TextInput defaultValue={`${def}`} placeholder='preferred position' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterPosition(value)} style={styles.textInput} />
                <TextInput defaultValue={`${def}`} placeholder='heigth' placeholderTextColor={'#8c9393'} onChangeText={(value) => setRegisterHeight(value)} style={styles.textInput} />
                <TouchableOpacity onPress={() => { handleSignUp() }} style={styles.signUpbutton}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </ScrollView>
            </KeyboardAvoidingView>
          }
        </TabView.Item>


      </TabView>


      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 0,

        }}
        style={{ height: '9%', backgroundColor: '#3A98B9' }}
      // variant="primary"


      >
        <Tab.Item
          title="Login"
          titleStyle={{ fontSize: 15, color: '#fff', fontFamily: colors.font }}
          icon={{ name: 'log-in-outline', type: 'ionicon', color: 'white', size: 35 }}

        />
        <Tab.Item

          title="Sign Up"
          titleStyle={{ fontSize: 15, color: '#fff', fontFamily: colors.font }}
          icon={{ name: 'basketball-outline', type: 'ionicon', color: 'white', size: 35 }}
        />
      </Tab>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    backgroundColor: '#3A98B9',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'white',
    paddingTop: Platform.OS === 'android' ? 20 : 0
  },
  textInput: {
    padding: 10,
    width: '60%',
    backgroundColor: "#fff",
    fontFamily: colors.font,
    flex: 1,
    marginLeft: 5,
    borderRadius: 15

  },
  homePage: {
    flex: 1,
    backgroundColor: '#3A98B9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  LoginPage: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Platform.OS === 'android' ? false : '25%'
  },
  SignUpPage: {
    flex: 1,

    justifyContent: 'center',
    backgroundColor: '#3A98B9',
    alignItems: 'center',
    gap: Platform.OS === 'android' ? false : '20%'
  },
  button: {
    backgroundColor: "#3A98B9",
    padding: 10,
    width: "60%",
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: '#3A98B9'


  },
  signUpbutton: {
    backgroundColor: "#3A98B9",
    padding: 10,
    width: "60%",
    borderRadius: 15,
    textAlign: 'center',


  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    fontFamily: colors.font
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '60%',
    borderRadius: 15,
  }



})

export default Login;