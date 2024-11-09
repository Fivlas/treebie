import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';

import React, { useState } from "react";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import {CustomInput} from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import {router, useNavigation} from "expo-router";
import {LoginSignupFooter} from "@/components/elements/LoginSignupFooter";


export default function Signup() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const handleSignupPress = () => {
        router.push("/(tabs)/login");
    }
    return (
        <SafeAreaView className={"flex-1"}>
            <LoginSignupHeader/>
            <View className={"flex flex-col p-12 flex-1 justify-between"}>
                <View>
                    <CustomInput type={"email"} placeholder={"E-mail"} value={login} onChangeText={setLogin} />
                    <CustomInput type={"password"} placeholder={"Hasło"} value={password} onChangeText={setPassword}/>
                    <CustomInput type={"password"} placeholder={"Powtórz hasło"} value={confirmPassword} onChangeText={setConfirmPassword}/>
                    <CustomButton title={"Zarejestruj"} buttonType={"primary"}/>
                    <TouchableOpacity onPress={handleSignupPress} className="mt-4">
                        <Text className="hover:text-blue-500 hover:underline text-gray-200 text-center">Posiadasz konto?
                            Zaloguj się!</Text>
                    </TouchableOpacity>
                </View>
                <LoginSignupFooter/>
            </View>
        </SafeAreaView>
    );
}
