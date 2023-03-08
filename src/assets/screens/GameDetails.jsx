import React, { Component } from 'react'
import { Text, View } from 'react-native'

const GamesDetails = ({ navigation, route }) => {

    return (
        <View>
            <Text> games details screen </Text>
            <Text>{route.params?.location}</Text>
        </View>
    )

}

export default GamesDetails
