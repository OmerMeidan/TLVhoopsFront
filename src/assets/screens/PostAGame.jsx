import React, { useState } from "react";
import { Text, View, SafeAreaView, TextInput, Button, StyleSheet } from "react-native";
import { } from 'react-native-dropdown-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LottieView from 'lottie-react-native';

const PostAGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [def, setDefault] = useState('')

  const [gameLocation, setGameLocation] = useState('')
  const [gameAddress, setGameAddress] = useState('')
  const [gameDate, setGameDate] = useState('')
  const [gameStartTime, setGameStartTime] = useState('')
  const [gamesEndTime, setGamesEndTime] = useState('')
  const [playersAmount, setPlayersAmount] = useState('')
  const [gameLevel, setGameLevel] = useState('')
  const [gameAge, setGameAge] = useState('')
  const [hostPhone, setHostPhone] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date) => {
    // Convert the date to a string
    const dateString = date.toISOString();
    console.log(dateString);
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handlePostAGame = async () => {
    try {
      const res = await axios.post('https://tlv-hoops-server.onrender.com/postagame', {
        gameLocation: gameLocation,
        gameAddress: gameAddress,
        gameDate: gameDate,
        gameStartTime: gameStartTime,
        gamesEndTime: gamesEndTime,
        playersAmount: playersAmount,
        gameLevel: gameLevel,
        gameAge: gameAge,
        hostPhone: hostPhone
      });
      if (res.status === 200) {
        console.log(res.data);
        setDefault("");
        Alert.alert("Congrats!", "You Just Posted A Game!", [{ text: 'OK', onPress: () => setDefault("") }]);
      }

    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          default:
            Alert.alert("An error occurred while trying to post a game. Please try again later.");
        }
      }
    }
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <SafeAreaView style={styles.PostAGamePage}>
        <SafeAreaView style={{ marginTop: '4%', justifyContent: 'flex-start', marginBottom: '8%' }}>
          <Text style={{ color: '#3A98B9', fontSize: 40 }}>Post Your Game</Text>
          <Text>Here you can post your game, and other players from the community can join you!</Text>
        </SafeAreaView>
        <TextInput defaultValue={`${def}`} placeholder='location' onChangeText={(value) => setGameLocation(value)} style={styles.textInput} />
        <TextInput defaultValue={`${def}`} placeholder='address' onChangeText={(value) => setGameAddress(value)} style={styles.textInput} />
        {/* <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date(2006, 11, 31)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput onPressIn={() => showDatePicker()} defaultValue={`${DateValue}`} placeholder='Date' onChangeText={(value) => setGameDate(value)} style={styles.textInput} /> */}
        <TextInput defaultValue={`${def}`} placeholder='start time' onChangeText={(value) => setGameStartTime(value)} style={styles.textInput} />
        <TextInput defaultValue={`${def}`} placeholder='end time' onChangeText={(value) => setGamesEndTime(value)} style={styles.textInput} />


        <TextInput defaultValue={`${def}`} placeholder='how many players already in?' onChangeText={(value) => setPlayersAmount(value)} style={styles.textInput} />
        <TextInput defaultValue={`${def}`} placeholder='level' onChangeText={(value) => setGameLevel(value)} style={styles.textInput} />
        <TextInput defaultValue={`${def}`} placeholder='age' onChangeText={(value) => setGameAge(value)} style={styles.textInput} />
        <TextInput defaultValue={`${def}`} placeholder='Host Phone Number' onChangeText={(value) => setHostPhone(value)} style={styles.textInput} />
        <Button title='Post Now!' onPress={() => handlePostAGame()} />
      </SafeAreaView>


    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '50%'
  },
  PostAGamePage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Platform.OS === 'android' ? false : '20%'
  }
})


export default PostAGame;
