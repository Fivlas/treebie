import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
    const userMessage = useLocalSearchParams().text || null;
    console.log(userMessage);

    return (
        <View>
            <Text>ai</Text>
            <Text>{userMessage}</Text>
        </View>
    )
}

export default index