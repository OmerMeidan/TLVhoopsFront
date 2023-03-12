import React, { useState, useContext } from "react";
import { Text, View, Image, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from '../../context/AuthContext';

const ViewProfile = () => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState(userDetails);

  const handleUpdateProfile = () => {
    setUserDetails(editedUserDetails);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'white',  }}>
      <ScrollView>
        <View style={{ height: '100%', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
          <Text style={styles.myProfileHeader}>My Profile</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '60%'}}>

            <Text style={styles.headertext}>First Name:</Text>
            <TextInput style={styles.textInput}
              placeholder="First Name"
              value={editedUserDetails.firstName}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, firstName: text })}
            />
            <Text style={styles.headertext}>Last Name:</Text>
            <TextInput style={styles.textInput}
              placeholder="Last Name"
              value={editedUserDetails.lastName}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, lastName: text })}
            />
            <Text style={styles.headertext}>Email:</Text>
            <TextInput style={styles.textInput}
              placeholder="Email"
              value={editedUserDetails.email}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, email: text })}
            />
            <Text style={styles.headertext}>Preferred Position:</Text>
            <TextInput style={styles.textInput}
              placeholder="Preferred Position"
              value={editedUserDetails.preferredPosition}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, preferredPosition: text })}
            />
            <Text style={styles.headertext}>Height:</Text>
            <TextInput style={styles.textInput}
              placeholder="Height"
              value={editedUserDetails.height}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, height: text })}
            />
            <Text style={styles.headertext}>Birth Date:</Text>
            <TextInput style={styles.textInput}
              placeholder="Birth Date"
              value={editedUserDetails.birthDate}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, birthDate: text })}
            />
            <Text style={styles.headertext}>Phone Number:</Text>
            <TextInput style={styles.textInput}
              placeholder="Phone Number"
              value={editedUserDetails.phoneNumber}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, phoneNumber: text })}
            />


            <TouchableOpacity style={styles.Createbutton} onPress={() => handleUpdateProfileData()}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        


          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};



const styles = StyleSheet.create({

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    borderColor: '#3A98B9',
    padding: 10,
    width: '100%',
  },
  Createbutton: {
    backgroundColor: "#3A98B9",
    padding: 10,
    width: "70%",
    borderRadius: 20,
    textAlign: 'center',

  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
  },
  myProfileHeader:{
    color:'#3A98B9',
    paddingBottom:'5%',
    fontSize:30,
  },
  headertext:{
    marginTop:'10%', color:'#3A98B9'
  }
})


export default ViewProfile;










// import React, { useEffect, useState, useContext } from "react";
// import { Text, View, Image } from 'react-native'
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AuthContext } from '../../context/AuthContext';
// const ViewProfile = () => {
//   const { userDetails, setUserDetails } = useContext(AuthContext);
//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Image source={require('../images/DemoLogo.jpeg')} style={{ height: '40%', width: '30%',  }} />
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text> {userDetails.firstName} {userDetails.lastName} </Text>
//         <Text> {userDetails.email} </Text>
//         <Text> {userDetails.preferredPosition} </Text>
//         <Text> {userDetails.height} </Text>
//         <Text> {userDetails.birthDate.toString().substr(0, 2) + '/' + userDetails.birthDate.toString().substr(2, 2) + '/' + userDetails.birthDate.toString().substr(4, 4)} </Text>
//         <Text> {userDetails.phoneNumber} </Text>
//       </View>
//     </SafeAreaView>
//   )
// }

// export default ViewProfile;

