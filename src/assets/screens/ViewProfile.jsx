import React, { useEffect, useState, useContext } from "react";
import { Text, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
const ViewProfile = () =>  {
  const {userDetails,setUserDetails} = useContext(AuthContext);
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text> {userDetails.firstName} {userDetails.lastName} </Text>
        <Text> {userDetails.email} </Text>
        <Text> {userDetails.preferredPosition} </Text>
        <Text> {userDetails.height} </Text>
        <Text> {userDetails.birthDate.toString().substr(0, 2) + '/' + userDetails.birthDate.toString().substr(2, 2) + '/' + userDetails.birthDate.toString().substr(4, 4)} </Text>
        <Text> {userDetails.phoneNumber} </Text>
      </View>
    )
  }

  export default ViewProfile; 

