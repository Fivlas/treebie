/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Href, router } from "expo-router";

interface ScrollCardProps {
    id: string;
    title: string;
    imageName: string;
    containerStyle?: string;
    redirect?: string;
}

const ScrollCard = ({ id, title, imageName, containerStyle, redirect }: ScrollCardProps) => {
    const handlePress = () => {
        const route: Href = redirect
            ? (`/tip/${id}?redirect=${redirect}` as Href)
            : (`/tip/${id}` as Href);
        router.replace(route);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View className={`bg-[#f2f3ef] w-44 h-52 rounded-3xl justify-center items-center ${containerStyle} relative`}>
                <Image source={{ uri: imageName }} className="size-36" />
                <Text className="absolute bottom-4 left-4 text-text font-medium">{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ScrollCard;
