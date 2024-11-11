/* eslint-disable @typescript-eslint/no-require-imports */
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
//@ts-ignore
import ProgressBar from 'react-native-progress/Bar';

const Tree = () => {
    const [progress, setProgress] = useState(0.4); // Example progress value (40%)

    return (
        <SafeAreaView className="flex-1">
            {/* Top Navigation Icons */}
            <View className="flex flex-row justify-between px-8 mt-2 items-center">
                <ThemedText
                    className="text-4xl font-semibold mb-2"
                >
                    Twoje drzewo
                </ThemedText>
                <TouchableOpacity onPress={() => router.push("/shop?redirect=tree" as Href)}>
                    <Feather name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="px-8 mt-12 flex justify-between h-full">
                <Image
                    source={require('@/assets/images/tree15.png')}
                    className="h-[510px] w-[300px] mx-auto"
                // className="h-[595px] w-[300px] mx-auto"
                />
                <View className='absolute bottom-32 left-7'>
                    <View className='flex-row items-center gap-2'>
                        <ThemedText className='font-bold'>Poziom: 3 </ThemedText>
                        <ProgressBar progress={0.5} width={250} height={20} color="#606c38" animating borderWidth={2} className="rounded-full" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default Tree;
