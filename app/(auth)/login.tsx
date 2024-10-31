import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import React from "react";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import {CustomInput} from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import { router } from "expo-router"; // Make sure to import the router object
import {LoginSignupFooter} from "@/components/elements/LoginSignupFooter";

export default function Login() {
    const handleSignupPress = () => {
        router.push("/signup"); // Use the router object to navigate to the "/signup" route
    }

    return (
        <SafeAreaView className={"flex-1"}>
            <LoginSignupHeader/>
            <View className={"flex flex-col p-12 flex-1 justify-between"}>
                <View>
                    <CustomInput type={"email"} placeholder={"E-mail"}/>
                    <CustomInput type={"password"} placeholder={"Hasło"}/>
                    <CustomButton title={"Zaloguj"} buttonType={"primary"}/>
                    <TouchableOpacity onPress={handleSignupPress} className="mt-4">
                        <Text className="text-text text-center">Nie masz konta? Zarejestruj się!</Text>
                    </TouchableOpacity>
                </View>
                <LoginSignupFooter/>
            </View>
        </SafeAreaView>
    );
}