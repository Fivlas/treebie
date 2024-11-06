import { router, Href } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import React from 'react';

interface SectionTextProps {
    title: string;
    route?: string;
    containerStyles?: string;
}

const SectionText = ({ title, route, containerStyles }: SectionTextProps) => {
    return (
        <View className={`flex-row justify-between items-center mb-4 ${containerStyles}`}>
            <ThemedText className="text-3xl font-medium">{title}</ThemedText>
            {route && (
                <TouchableOpacity onPress={() => router.push(route as Href)}>
                    <Text className='text-[#63784f]'>Zobacz więcej</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SectionText;
