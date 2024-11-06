import { Pressable, StyleSheet, TextInput, View, Text} from "react-native";
import {TitleHeader} from "@/components/TitleHeader";
import {SubtitleHeader} from "@/components/SubtitleHeader";
import React from "react";
import {AnimatedLeaf} from "@/components/LoginSignup/AnimatedLeaf";
import DismissKeyboard from "./DismissKeyboard";

export default function LoginSignupHeader() {
    return (
        <DismissKeyboard>
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
                {/* <TextInput placeholder="login" className="text-3xl text-white" />
                <TextInput placeholder="haslo" className="text-3xl text-white" />
                <Pressable><Text className="text-white">Submit</Text></Pressable> */}
            </View>
        </DismissKeyboard>
        
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 50,
        padding: 30,
        gap: 10,
        // marginBottom: 150
    }
});