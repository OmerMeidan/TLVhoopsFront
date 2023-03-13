import React, { useState, useContext } from "react";
import { Text, View, Image, TextInput, Button, StyleSheet } from 'react-native';
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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../images/DemoLogo.jpeg')} style={{ height: '20%', width: '40%' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isEditing ? (
          <>
            <Text>First Name:</Text>
            <TextInput style={styles.textInput}
              placeholder="First Name"
              value={editedUserDetails.firstName}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, firstName: text })}
            />
            <Text>Last Name:</Text>
            <TextInput style={styles.textInput}
              placeholder="Last Name"
              value={editedUserDetails.lastName}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, lastName: text })}
            />
            <Text>Email:</Text>
            <TextInput style={styles.textInput}
              placeholder="Email"
              value={editedUserDetails.email}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, email: text })}
            />
            <Text>Preferred Position:</Text>
            <TextInput style={styles.textInput}
              placeholder="Preferred Position"
              value={editedUserDetails.preferredPosition}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, preferredPosition: text })}
            />
            <Text>Height:</Text>
            <TextInput style={styles.textInput}
              placeholder="Height"
              value={editedUserDetails.height}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, height: text })}
            />
            <Text>Birth Date:</Text>
            <TextInput style={styles.textInput}
              placeholder="Birth Date"
              value={editedUserDetails.birthDate}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, birthDate: text })}
            />
            <Text>Phone Number:</Text>
            <TextInput style={styles.textInput}
              placeholder="Phone Number"
              value={editedUserDetails.phoneNumber}
              onChangeText={text => setEditedUserDetails({ ...editedUserDetails, phoneNumber: text })}
            />
          </>
        ) : (
          <>
            <Text>First Name: {userDetails.firstName}</Text>
            <Text >Last Name: {userDetails.lastName}</Text>
            <Text >Email: {userDetails.email}</Text>
            <Text >Preferred Position: {userDetails.preferredPosition}</Text>
            <Text >Height: {userDetails.height}</Text>
            <Text >Birth Date: {userDetails.birthDate.toString().substr(0, 2) + '/' + userDetails.birthDate.toString().substr(2, 2) + '/' + userDetails.birthDate.toString().substr(4, 4)}</Text>
            <Text >Phone Number: {userDetails.phoneNumber}</Text>
          </>
        )}
        {isEditing ? (
          <Button title="Update" onPress={handleUpdateProfile} />
        ) : (
          <Button title="Edit" onPress={() => setIsEditing(true)} />
        )}
      </View>
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

