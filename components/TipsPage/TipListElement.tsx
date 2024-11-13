import React from 'react'
import { Image, Text, View } from 'react-native'
import { ThemedText } from '../ThemedText';

interface TipListElement {
    image: string;
    text: string;
}

const TipListElement = ({ image, text} : TipListElement) => {
    return (
        <View className="flex-row items-center gap-3">
            <View className="bg-[#f2f3ef] p-2 rounded-lg">
                <Image source={{ uri: image }} className="w-6 h-6" />
            </View>
            <ThemedText className="font-light opacity-80 leading-relaxed text-lg">
                {text}
            </ThemedText>
        </View>
    )
}

export default TipListElement