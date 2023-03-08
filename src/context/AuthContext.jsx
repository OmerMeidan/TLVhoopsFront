import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(null)

  // const handleLogIn = async () => {
  //   try {
  //     const lowerEmail = email.toLowerCase()
  //     const res = await axios.post('https://tlv-hoops-server.onrender.com/login', {
  //       lowerLoginEmail: lowerEmail,
  //       loginPass: password
  //     })
  //     if (res.data) {
  //       setToken(res.data.token)
  //       console.log(res.data.token)
  //       Alert.alert("Welcome!", "You just loged in!", [{ text: 'ok', onPress: () => console.log("ok") }])
  //     }
  //   }
  //   catch (error) {
  //     Alert.alert("User doesn't exist!")
  //     console.log(error)
  //   }
  // }

  const handleLogIn = () => {
    setIsLoading(true);
    setToken('jfbsjk');
    AsyncStorage.setItem('token', 'jfbsjk')
    setIsLoading(false);
  }

  const handleLogout = () => {
    setIsLoading(true);
    setToken(null);
    AsyncStorage.removeItem('token')
    setToken(null);
    setIsLoading(false);
  }

  const isLoggedIn = async () => {
    try {
      // setIsLoading(true);
      token = await AsyncStorage.getItem('token');
      setToken(token);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in ${error}`);

    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, token, handleLogIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
};
