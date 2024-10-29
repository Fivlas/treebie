import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

interface SectionTextProps {
    title: string;
    route: string;
    containerStyles?: string;
}

const SectionText = ({ title, route, containerStyles }: SectionTextProps) => {
    return (
        <View className={`flex-row justify-between items-center mb-4 ${containerStyles}`}>
            <Text className="text-3xl font-medium text-gray-800">{title}</Text>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => router.push(route)}>
                <Text className="text-[#63784f]">Zobacz więcej</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SectionText