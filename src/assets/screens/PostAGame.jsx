import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  Image,
  Animated,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView, Easing
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

function PostAGame() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Mid-Level', value: 'Mid-Level' },
    { label: 'Pro', value: 'Pro' }
  ]);
  const [openLocation, setOpenLocations] = useState(false)
  const [LocationsArr, setLocationsArr] = useState([
    { label: 'Tlv1', value: 'Tlv1' },
    { label: 'Tlv2', value: 'Tlv2' },
    { label: 'Tlv3', value: 'Tlv3' },
  ])
  const navigation = useNavigation()
  const [Date, setDate] = useState('')
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
  const [Price, setPrice] = useState('')
  const [Location, setLocation] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  //Creating new game
  const handleCreateGame = async () => {
    try {
      const res = await axios.post('', {
        date: Date,
        startTime: StartTime,
        endTime: EndTime,
        //createdByUser:token,
        ageMin: MinimumAge,
        ageMax: MaximumAge,
        level: Level, //select
        //tlvPremium:true/false,
        price: Price, //price per person or per the rent
        locationID: Location, //select 
        //maximum players

      })
      if (res.status === 200) {
        Alert.alert("Game Created Successfully")
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
            onPress: () => console.log('user wants to return to home page')
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
    setDate(day + month + year)
    setDateValue(day + "/" + month + "/" + year)
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
  return (
    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ height: '100%', width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8%', flex: 1 }}>
          <Text h2 style={{color:'#3A98B9'}}>Post Your Game Now!</Text>
          <Text style={{color:'#3A98B9', textAlign:'center', paddingTop:'5%'}}>Here you can post yoyr game and other players from the community will join you!</Text>
          <View style={{ height: '100%', width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: '10%' }}>
          <TextInput placeholder='Location name' style={styles.textInput} />
          <TextInput placeholder='Vaild Address of the location' style={styles.textInput} />
            <TextInput defaultValue={`${DateValue}`} onPressIn={() => showDatePicker()} placeholder='Date' style={styles.textInput} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput defaultValue={`${StartValue}`} onPressIn={() => showStartTimePicker()} placeholder='Start Time' style={styles.textInput} />
            <DateTimePickerModal
              is24Hour={true}
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmStartTime}
              onCancel={hideStartTimePicker}
            />
            <TextInput defaultValue={`${EndValue}`} onPressIn={() => showEndTimePicker()} placeholder='End Time' style={styles.textInput} />
            <DateTimePickerModal
              is24Hour={true}
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmEndTime}
              onCancel={hideEndTimePicker}
            />
            <TextInput placeholder='Minimum Age' style={styles.textInput} />
            <TextInput placeholder='Maximum Age' style={styles.textInput} />
       


            <TextInput placeholder='How many players already?' style={styles.textInput} />

            <TextInput placeholder="Price - if it's free enter 0" style={styles.textInput} />
            <TextInput placeholder='Host Phone number' style={styles.textInput} />
            {/* <DropDownPicker
              placeholder='select level'
              open={openLocation}
              value={Location}
              items={LocationsArr}
              setOpen={setOpenLocations}
              setValue={setLocation}
              setItems={setLocationsArr}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, width: '50%', marginBottom: '5%', marginLeft: '25%' }}
            /> */}
     <DropDownPicker
              placeholder='select level'
              open={open}
              value={Level}
              items={items}
              setOpen={setOpen}
              setValue={setLevel}
              setItems={setItems}
              style={{ borderWidth: 1,  borderRadius: 20,    borderColor: '#3A98B9',  marginBottom: '5%', width :'60%', marginLeft:'20%', }}
            />

        <TouchableOpacity style={styles.Createbutton} onPress={() => handleCreateGame()}>
          <Text  style={styles.buttonText}>Create</Text>
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
    borderRadius: 20,
    borderColor: '#3A98B9',
    padding: 10,
    width: '60%',
    marginBottom: '5%'
  },


  // textInput: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   padding: 10,
  //   width: '50%',
  //   marginBottom: '5%'
  // },
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '50%',
    height: '10%',
    marginBottom: '5%'
  },

  Createbutton: {
    backgroundColor: "#3A98B9",
    padding: 10,
    width: "60%",
    borderRadius: 20,
    textAlign: 'center',

  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30
  }
})
export default PostAGame;