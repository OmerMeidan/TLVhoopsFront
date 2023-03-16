import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../colors";


const About = () => {
  return (
    <ScrollView style={{backgroundColor:'#3A98B9' }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", justifyContent: 'center',  }}>


        <Text style={styles.header}>ABOUT TLV-HOOPS</Text>
        <Text style={styles.header2}>What are "Community" Games?</Text>
        <Text style={styles.aboutText}>A game in an external court, cost-free, community organized.</Text>
        <Text style={styles.header2}>What are "Premium" games?</Text>
        <Text style={styles.aboutText2}>Games in internal and scheduled courts, organized by the app's team, at a small cost.</Text>
        <Text style={styles.header2}>What is TLV-Hoops?</Text>
        <Text style={styles.aboutText}> TLV-Hoops is an innovative application that provides basketball enthusiasts with a platform to connect and engage in community games. With TLV-Hoops, you can post and join 3on3 or 5on5 basketball games by simply sharing simple details.

          Our goal is to foster a sense of community among basketball players and create a fun, competitive environment for everyone to enjoy. Whether you're an experienced player or just starting, TLV-Hoops offers a welcoming and inclusive space for all.

          It's important to note that TLV-Hoops only serves as a platform for players to connect and organize games. We do not assume any responsibility for the games organized by our users.

          In addition to community games, TLV-Hoops also offers premium games. These games are organized and hosted by TLV-Hoops and take place on indoor courts, which require a fee to book. You can register for these premium 5on5 games and take your basketball experience to the next level.

          Join TLV-Hoops today and become a part of the vibrant basketball community in your area!</Text>

          <Image source={require('../images/DemoLogo.jpeg')}
                    style={{ width: 170, height: 170,marginBottom:'7%' }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "#fff",
    padding: '5%', fontFamily: colors.font

  },
  header2: {
    fontSize: 22,
    fontFamily: colors.font,
    padding: '5%'

  },
  aboutText: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 15,
    width: '90%',
    fontFamily: colors.font,
  },
  aboutText2: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 15,
    width: '90%',
    padding: '5%',
    fontFamily: colors.font
  }
})

export default About;
