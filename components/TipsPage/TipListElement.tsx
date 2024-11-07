import React from 'react'
import { Image, Text, View } from 'react-native'

interface TipListElement {
    image: string;
    text: string;
}

//@TODO image handler
const TipListElement = ({ image, text} : TipListElement) => {
    return (
        <View className="flex-row items-center gap-3">
            <View className="bg-[#f2f3ef] p-2 rounded-lg">
                <Image source={require(`@/assets/images/logo-icon-new.png`)} className="w-6 h-6" />
            </View>
            <Text className="font-light text-text opacity-80 leading-relaxed text-lg">
                {text}
            </Text>
        </View>
    )
}

export default TipListElement