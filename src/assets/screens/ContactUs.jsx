import React from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactUs = () => {
  const phoneNumber = '+972-555-5555';
  const emailAddress = 'info@tlvhoops.com';

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>We'd Love to Hear From You!</Text>
      <View style={styles.content}>
        <Text style={styles.address}>123 Dizengoff St.</Text>
        <Text style={styles.address}>Tel Aviv, Israel</Text>
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Text style={styles.buttonText}>Call us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}>Email us</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>
        You can also reach us by phone at {phoneNumber} or by email at {emailAddress}. We'll do our best to respond to your message within 24 hours. Thank you for choosing TLV Hoops!
      </Text>
      <Image source={require('../images/DemoLogo.jpeg')}
                style={{ width: 200, height: 200 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
   backgroundColor:'#3A98B9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  address: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
    minWidth: 150,
  },
  buttonText: {
    color: '#3A98B9',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 30
  },
});

export default ContactUs;
