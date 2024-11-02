import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';

import LoginSignupHeader from "@/components/LoginSignupHeader";
import {CustomInput} from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import {router} from "expo-router";
import {LoginSignupFooter} from "@/components/elements/LoginSignupFooter";


export default function Signup() {
    const handleSignupPress = () => {
        router.push("/login")
    }
    return (
        <SafeAreaView className={"flex-1"}>
            <LoginSignupHeader/>
            <View className={"flex flex-col p-12 flex-1 justify-between"}>
                <View>
                    <CustomInput type={"email"} placeholder={"E-mail"}/>
                    <CustomInput type={"password"} placeholder={"Hasło"}/>
                    <CustomInput type={"password"} placeholder={"Powtórz hasło"}/>
                    <CustomButton title={"Zarejestruj"} buttonType={"primary"}/>
                    <TouchableOpacity onPress={handleSignupPress} className="mt-4">
                        <Text className="text-text text-center">Posiadasz konto? Zaloguj się!</Text>
                    </TouchableOpacity>
                </View>
                <LoginSignupFooter/>
            </View>
        </SafeAreaView>
    );
}
