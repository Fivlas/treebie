import {StyleSheet, View} from "react-native";
import {TitleHeader} from "@/components/TitleHeader";
import {SubtitleHeader} from "@/components/SubtitleHeader";
import React from "react";
import {AnimatedLeaf} from "@/components/LoginSignup/AnimatedLeaf";

export default function LoginSignupHeader() {
    return (
        <View style={styles.container}>
            <View className={"relative items-center justify-center"}>
                <View className={"absolute flex flex-row items-end"}>
                    <View  style={{
                        right: -40,
                        top: 30
                    }}><AnimatedLeaf className={"border-leafSecondary"}/></View>
                    <View  style={{
                        left: -40,
                        top: 15
                    }}><AnimatedLeaf className={"border-primary"}/></View>
                </View>
            </View>
            <TitleHeader>Podejmij Eko-wyzwanie!</TitleHeader>
            <SubtitleHeader>Wykonuj zadania, zbieraj punkty i wymieniaj na nagrody</SubtitleHeader>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 50,
        padding: 30,
        gap: 10
    }
});