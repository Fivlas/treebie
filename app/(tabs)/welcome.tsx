import {ThemedText} from "@/components/ThemedText";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {ImageBackground} from "react-native";

export default function Welcome(props: {}) {
    return <SafeAreaView
        className={""}>
        <ImageBackground
            source={require('@/assets/images/banner-image.png')}
            className="bg-[#63784f] pt-[85px] pb-14 px-8 flex gap-2 items-center justify-center h-full bg-center bg-contain bg-repeat"
            style={{borderBottomLeftRadius: 35, borderBottomRightRadius: 35}}
        >
            <ThemedText type={"title"} style={{ fontSize: 80, lineHeight: 85, fontWeight: 'bold' }}>Save</ThemedText>
            <ThemedText type={"title"} style={{ fontSize: 80, lineHeight: 85, fontWeight: 'bold' }}>The</ThemedText>
            <ThemedText type={"title"} style={{ fontSize: 80, lineHeight: 85, fontWeight: 'bold' }}>Planet</ThemedText></ImageBackground>
    </SafeAreaView>;
}