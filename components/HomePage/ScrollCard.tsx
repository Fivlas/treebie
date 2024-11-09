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
    routeBase?: string;
}

const ScrollCard = ({ id, title, imageName, containerStyle, redirect, routeBase }: ScrollCardProps) => {
    routeBase ??= "tip";
    const handlePress = () => {
        const route: Href = redirect 
        ? (`/${routeBase}/${id}?redirect=${redirect}` as Href) 
        : (`/${routeBase}/${id}` as Href);
    router.push(route);
    }
    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View className={`bg-[#f2f3ef] w-44 h-52 rounded-3xl justify-center items-center ${containerStyle}`}>
                <Image source={require(`@/assets/images/logo-icon-new.png`)} className="w-12 h-12" />
                <Text className="mt-2 text-text font-medium text-left">{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ScrollCard;
