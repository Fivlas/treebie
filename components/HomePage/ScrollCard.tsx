/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Href, router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

interface ScrollCardProps {
    id: string;
    title: string;
    imageName: string | any;
    containerStyle?: string;
    redirect?: string;
    onClick?: () => void;
}

const ScrollCard = ({ id, title, imageName, containerStyle, redirect, onClick }: ScrollCardProps) => {
    const secondaryBackground = useThemeColor({}, 'secondaryBackground');
    const handlePress = () => {
        if(onClick == undefined){
            const route: Href = redirect
                ? (`/tip/${id}?redirect=${redirect}` as Href)
                : (`/tip/${id}` as Href);
            router.replace(route);
        }else{
            onClick();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={{ backgroundColor: secondaryBackground }} className={`w-44 h-52 rounded-3xl justify-center items-center ${containerStyle} relative`}>
                <Image source={ {uri: imageName} } className="size-36" />
                <ThemedText className="absolute bottom-4 left-4 font-medium">{title}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default ScrollCard;
