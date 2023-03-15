import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { Card, Button, Title, } from 'react-native-paper';

const Notifications = () => {
    return (
        <SafeAreaView style={styles.SafeAreaViewStyle} >
            <ScrollView style={styles.ScrollViewStyle}>
            <Text>
                Your Notifications:
            </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notifications

const styles = StyleSheet.create({
    SafeAreaViewStyle: {
        flex: 1,
        backgroundColor: '#3A98B9'
      },
      ScrollViewStyle: {
        padding: 20,
      },
})