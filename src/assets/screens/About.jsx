import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const About = () => {
  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.header}>ABOUT TLV-HOOPS</Text>
      <Text style={styles.aboutText}> TLV-Hoops is an innovative application that provides basketball enthusiasts with a platform to connect and engage in community games. With TLV-Hoops, you can post and join 3on3 or 5on5 basketball games by simply sharing the location, date, time, number of players, skill level, and age group.

        Our goal is to foster a sense of community among basketball players and create a fun, competitive environment for everyone to enjoy. Whether you're an experienced player or just starting, TLV-Hoops offers a welcoming and inclusive space for all.

        It's important to note that TLV-Hoops only serves as a platform for players to connect and organize games. We do not assume any responsibility for the games organized by our users.

        In addition to community games, TLV-Hoops also offers premium games. These games are organized and hosted by TLV-Hoops and take place on indoor courts, which require a fee to book. You can register for these premium 5on5 games and take your basketball experience to the next level.

        Join TLV-Hoops today and become a part of the vibrant basketball community in your area!</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "#3A98B9",
    marginBottom: 200
  },
  aboutText: {

    fontSize: 15,
  }
})

export default About;
