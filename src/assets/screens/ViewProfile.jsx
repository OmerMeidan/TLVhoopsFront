
import React, { useState, useContext } from "react";
import { Text, View, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from '../../context/AuthContext';

const ViewProfile = (route) => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState(userDetails);


  const handleUpdateProfile = async () => {
    try{
    const res = await axios.post('https://tlv-hoops-server.onrender.com/editPlayer', {
firstName: editedUserDetails.firstName,
lastName: editedUserDetails.lastName,
email: editedUserDetails.email,
birthDate: editedUserDetails.birthDate,
phoneNumber: editedUserDetails.phoneNumber,
preferredPosition: editedUserDetails.preferredPosition,
height: editedUserDetails.height,
admin: editedUserDetails.admin,


    })
  }
    

    setIsEditing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3A98B9" }}>
      <Image source={require('../images/DemoLogo.jpeg')} style={{ height: '30%', width: '45%' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isEditing ? (
          <>
            <View style={styles.row}>
              <Text style={styles.header}>First Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                value={editedUserDetails.firstName}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, firstName: text })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Last Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                value={editedUserDetails.lastName}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, lastName: text })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Email:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                value={editedUserDetails.email}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, email: text })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Preferred Position:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Preferred Position"
                value={editedUserDetails.preferredPosition}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, preferredPosition: text })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Height:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Height"
                value={editedUserDetails.height}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, height: text })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Birth Date:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Birth Date"
                value={editedUserDetails.birthDate}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, birthDate: text })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Phone Number:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                value={editedUserDetails.phoneNumber}
                onChangeText={(text) => setEditedUserDetails({ ...editedUserDetails, phoneNumber: text })}
              />
            </View>
          </>


        ) : (
          <>
            <View style={styles.row}>
              <Text style={styles.header}>First Name:</Text>
              <Text>{userDetails.firstName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Last Name:</Text>
              <Text>{userDetails.lastName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Email:</Text>
              <Text>{userDetails.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Preferred Position:</Text>
              <Text>{userDetails.preferredPosition}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Height:</Text>
              <Text>{userDetails.height}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Birth Date:</Text>
              <Text>{userDetails.birthDate.toString().substr(0, 2) + '/' + userDetails.birthDate.toString().substr(2, 2) + '/' + userDetails.birthDate.toString().substr(4, 4)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>Phone Number:</Text>
              <Text>{userDetails.phoneNumber}</Text>
            </View>
          </>
        )}
        {isEditing ? (
          <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>


        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

        )}
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginHorizontal: '5%'
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#fff',
    width: '30%',
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: '5%',
    backgroundColor: "#fff",
    padding: 10,
    width: "60%",
    borderRadius: 15,
    textAlign: 'center',



  },
  buttonText: {
    textAlign: 'center',
    color: '#3A98B9',
    fontSize: 30
  },

  infoStyle: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});


export default ViewProfile;

