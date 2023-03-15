import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'

const PlayersList = ({ participants }) => {
    return (
        <SafeAreaView style={styles.SafeAreaViewStyle}>
            <ScrollView style={styles.ScrollViewStyle}>
                <Text style={styles.Header}>Players Already in the Game:</Text>
                {participants && 
                participants.map((participant, index) => (
                    <Text key={index} style={styles.Text}>
                        {participant}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlayersList

const styles = StyleSheet.create({
    SafeAreaViewStyle: {
        flex: 1,
        backgroundColor: '#3A98B9',
    },
    ScrollViewStyle: {
        padding: 20,
    },
    Header: {
        fontSize: 24,
        fontWeight: '600',
        color: "#fff",
        padding: 10,
    },
    Text: {
        fontSize: 20,
        fontWeight: '400',
        color: "#fff",
        paddingTop: 30,
        padding: 10
    },
})