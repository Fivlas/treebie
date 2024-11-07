/* eslint-disable @typescript-eslint/no-require-imports */
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

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
            <View className='border border-red-700 h-full px-8 mt-4'>
                <Image source={require('@/assets/images/tree15.png')} className='h-[510px] w-[300px] mx-auto' />
                <Text>progrtess</Text>
            </View>
        </SafeAreaView>
    )
}

export default tree