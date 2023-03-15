import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  FlatList,
  Image,
  Animated,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Tab, TabView, Text } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'
import colors from '../../colors';
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from '../../Constans';
import { AuthContext } from '../../context/AuthContext';
function PostAGame() {
  const { setToken, token, PremiumGamesArr, setPremiumGamesArr, CommunityGamesArr, setCommunityGamesArr, emailToken, userDetails, setUserDetails } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Mid-Level', value: 'Mid-Level' },
    { label: 'Pro', value: 'Pro' }
  ]);
  const navigation = useNavigation()
  const [date, setDate] = useState('')
  const [StartTime, setStartTime] = useState('')
  const [EndTime, setEndTime] = useState('')
  //input default values
  const [DateValue, setDateValue] = useState('')
  const [StartValue, setStartValue] = useState('')
  const [EndValue, setEndValue] = useState('')
  //
  const [MinimumAge, setMinimumAge] = useState('')
  const [MaximumAge, setMaximumAge] = useState('')
  const [Level, setLevel] = useState('')
  const [MaximumPlayers, setMaximumPlayers] = useState('')

  const [Location, setLocation] = useState('')
  const [courtName, setCourtName] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const refresh = () => {
    setCourtName('')
    setLocation('')
    setDateValue('')
    setStartValue('')
    setEndValue('')
    setMinimumAge('')
    setMaximumAge('')
    setMaximumPlayers('')
    setLevel('')
    setInputText('')
    navigation.navigate('Home')
  }
  //Creating new game
  const handleCreateGame = async () => {
    try {
      // 
      const res = await axios.post('https://tlv-hoops-server.onrender.com/addGame',
        {
          courtName: courtName,
          address: Location,
          date: date,
          startTime: StartTime,
          endTime: EndTime,
          ageMin: MinimumAge,
          maximumPlayers: MaximumPlayers,
          ageMax: MaximumAge,
          level: Level,
          tlvpremium: false,
          price: 0,
          createdByUser: userDetails.email,
          approved: false,
          participants: participantsArr,
          // phoneNumber:userDetails.phoneNumber
        })
      if (res.status === 200) {
        setParticipantsArr([])
        Alert.alert("Request to created Successfully", '', [{
          text: 'Take me to home page',
          onPress: () => {refresh()}
        }])
        //make it render again
      }
    }
    catch (error) {
      if (error.response.status === 403) {
        Alert.alert("Cannot Create This Game", "please try again!", [
          {
            text: 'try again',
            onPress: () => console.log('user wants to try again')
          },
          {
            text: 'return to home page',
            onPress: () => refresh()
          }])
      }
      else if(error.response.status === 409){
        Alert.alert("Game is already exist",'',[{
          text:'Ok',
          onPress:()=>window.location.reload()
        }])
      }
      else if(error.response.status === 500){
        if(MaximumPlayers>20){
          Alert.alert("Maximum players value is more than allowed", "please try again!", [
            {
              text: 'try again',
              onPress: () => console.log('user wants to try again')
            }])
        }
        else if(MaximumPlayers<4){
          Alert.alert("Maximum players value is less than allowed", "please try again!", [
            {
              text: 'try again',
              onPress: () => console.log('user wants to try again')
            }])
        }
        Alert.alert("Cannot Create This Game", "please try again!", [
          {
            text: 'try again',
            onPress: () => console.log('user wants to try again')
          },
          {
            text: 'return to home page',
            onPress: () => refresh()
          }])
      }
      console.log(error)

    }
  }


  //handle date input
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
   
    const finalDate = new Date(year + "-" + month + "-" + day);
    const today = new Date();
    if ((finalDate.getTime()+100000000) < today.getTime()) {
      Alert.alert("This date is expired", '', [{
        text: 'Ok',
        onPress: () =>console.log('ok')
      }])
    } else {
      setDate(day + month + year)
      setDateValue(day + "/" + month + "/" + year)
      
    }
    hideDatePicker();
  };

  //handle start time input
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true)
  };
  const hideStartTimePicker = () => {
    console.log(StartTime)
    setStartTimePickerVisibility(false);
  };
  const handleConfirmStartTime = (time) => {
    setStartValue(time.toISOString().substr(11, 5))
    const timeString = time.toISOString().substr(11, 5).replace(':', '')
    const UpdateHour = parseInt(timeString.slice(0, 2)) + 2
    const StringUpdateHour = '' + UpdateHour
    const FinalTime = StringUpdateHour + timeString.slice(2, 4)
    setStartTime(FinalTime);
    if (FinalTime.length === 4) {
      const val = FinalTime.slice(0, 2) + ":" + FinalTime.slice(2);
      setStartValue(val)
    }
    else if (FinalTime.length === 3) {
      const val = FinalTime.slice(0, 1) + ":" + FinalTime.slice(1, 3);
      setStartValue(val)
    }
    hideStartTimePicker();
  }
  //handle end time input
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true)
  };
  const hideEndTimePicker = () => {
    console.log(EndTime)
    setEndTimePickerVisibility(false);
  };
  const handleConfirmEndTime = (time) => {
    setEndValue(time.toISOString().substr(11, 5))
    const timeString = time.toISOString().substr(11, 5).replace(':', '')
    const UpdateHour = parseInt(timeString.slice(0, 2)) + 2
    const StringUpdateHour = '' + UpdateHour
    const FinalTime = StringUpdateHour + timeString.slice(2, 4)
    setEndTime(FinalTime);
    if (FinalTime.length === 4) {
      const val = FinalTime.slice(0, 2) + ":" + FinalTime.slice(2);
      setEndValue(val)
    }
    else if (FinalTime.length === 3) {
      const val = FinalTime.slice(0, 1) + ":" + FinalTime.slice(1, 3);
      setEndValue(val)
    }
    hideEndTimePicker();
  }
  console.log(Level)

  useEffect(()=>{
      return(
        setParticipantsArr([])
      )
  },[])
  const [inputText, setInputText] = useState('');
  const [users, setUsers] = useState([]);
  const [participantsArr, setParticipantsArr] = useState([])

  useEffect(() => {
    const handleSearch = async () => {
      // make your API call to search for user in database here
      try {
        const response = await axios.post(`https://tlv-hoops-server.onrender.com/playerList`, {});
        // update the state with the search results
        setUsers(response.data);
        console.log("hi");
      } catch (error) {
        console.error(error);
      }
    };
    // call the handleSearch function with the current input text
    handleSearch();
  }, []);

  const [SHTZ, setSHTZ] = useState('none')
  const handleFlatList = (text) => {
    setInputText(text)
    if (text !== '') {
      setSHTZ('block')
    } else {
      setSHTZ('none')
    }
  }

  const handleAddPlayer = (player) => {
    if (!participantsArr.find(a => a === player)) {
      setParticipantsArr(prev => [...prev, player])
    }
    else {
      Alert.alert("This user is already invited!")
    }
  }

  console.log("hi", participantsArr)

  return (
    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#3A98B9' }}>
      <ScrollView>
        <View style={{ height: '100%', width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8%', flex: 1 }}>
          <Text h2 style={{color:'#fff'}}>Post Your Game Now!</Text>
          <Text style={{color:'#fff', textAlign:'center', paddingTop:'5%'}}>Here you can post your game and other players from the community will join you!</Text>
          <View style={{ height: '100%', width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: '10%' }}>
          <TextInput defaultValue={courtName} placeholderTextColor={'black'} onChangeText={text=>setCourtName(text)}  placeholder='Court name' style={styles.textInput} />
          <TextInput defaultValue={Location} placeholderTextColor={'black'} onChangeText={text=>setLocation(text)} placeholder='Vaild Address of the location' style={styles.textInput} />
            <TextInput defaultValue={`${DateValue}`} onPressIn={() => showDatePicker()} placeholder='Date' style={styles.textInput}  placeholderTextColor={'black'} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput defaultValue={`${StartValue}`} onPressIn={() => showStartTimePicker()} placeholder='Start Time '  placeholderTextColor={'black'} style={styles.textInput} />
            <DateTimePickerModal
              is24Hour={true}
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmStartTime}
              onCancel={hideStartTimePicker}
            />
            <TextInput defaultValue={`${EndValue}`} onPressIn={() => showEndTimePicker()} placeholder='End Time'  placeholderTextColor={'black'}  style={styles.textInput} />
            <DateTimePickerModal
              is24Hour={true}
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmEndTime}
              onCancel={hideEndTimePicker}
            />

            <TextInput defaultValue={MinimumAge} placeholder='Minimum Age' placeholderTextColor={'black'}  onChangeText={text => setMinimumAge(text)} style={styles.textInput} />
            <TextInput defaultValue={MaximumAge} placeholder='Maximum Age' placeholderTextColor={'black'}  onChangeText={text => setMaximumAge(text)} style={styles.textInput} />



            <TextInput defaultValue={MaximumPlayers} placeholder='Maximum palyers' placeholderTextColor={'black'}  onChangeText={text => setMaximumPlayers(text)} style={styles.textInput} />

            <TextInput style={styles.textInput}
            placeholderTextColor={'black'} 
              placeholder="Search for players to join you!"
              value={inputText}
              autoCapitalize='none'
              onChangeText={text => handleFlatList(text)}
            />

            <FlatList
              style={{
                display: `${SHTZ}`,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                width: '50%',
                marginBottom: '5%',
                padding: 10,
                flexGrow: 0
              }}
              data={users}
              renderItem={({ item }) => {
                if (item.firstName.startsWith(inputText) || item.lastName.startsWith(inputText) ) {
                  return (
                    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around', backgroundColor:'white' }}>
                      <Text>{item.firstName + " " + item.lastName}</Text>
                      <TouchableOpacity
                        onPress={() => handleAddPlayer(item.email)}
                        style={{
                          backgroundColor: '#fff',
                          width: 70,
                          padding: 3,
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            color: "#3A98B9",
                            textAlign: "center",
                            fontSize: 13,
                          }}>Add Player
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else if (item.firstName.startsWith()) {
                  return (
                    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-around' }}>
                      <Text>No matches found</Text>
                      </View>
                  )
                }
              }}

            />

            <DropDownPicker
              placeholder='Select Game level'
              placeholderTextColor={'black'} 
              open={open}
              value={Level}
              items={items}
              setOpen={setOpen}
              setValue={setLevel}
              setItems={setItems}
              style={{ borderWidth: 1, borderRadius: 15, borderColor: '#3A98B9', marginBottom: '5%', width: '60%', marginLeft: '20%', }}
            />

            <TouchableOpacity style={styles.Createbutton} onPress={() => handleCreateGame()}>
              <Text style={styles.buttonText}>Post Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    width: '60%',
    marginBottom: '5%',
    backgroundColor:'#fff',

    
  },
  textInputSearch: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    borderColor: '#ç',
    padding: 10,
    width: '60%',
    marginBottom: '5%'
},


  a: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '50%',
    marginBottom: '5%',
    padding: 10,
    flexGrow: 0
  },
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '50%',
    height: '10%',
    marginBottom: '5%'
  },

  Createbutton: {
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
  }
})


export default PostAGame;