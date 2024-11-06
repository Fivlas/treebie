import { Feather } from '@expo/vector-icons'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const tree = () => {
    return (
        <SafeAreaView>
            <View className='flex flex-row justify-between px-8'>
                <TouchableOpacity>
                    <Feather name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Feather name="camera" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default tree