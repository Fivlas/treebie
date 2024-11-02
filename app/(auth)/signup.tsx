import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';

import LoginSignupHeader from "@/components/LoginSignupHeader";
import {CustomInput} from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import {router} from "expo-router";
import {LoginSignupFooter} from "@/components/elements/LoginSignupFooter";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase.config';
import { useState } from 'react';


export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSignupPress = () => {
        router.push("/login")
    }

    const signUp = async () => {
        try {
            if(password == repassword){
                const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
                await sendEmailVerification(response.user);
                alert('Mail weryfikacyjny został wysłany na adres ' + email);
            }else{
                console.log("pass != repass");
            }
        }
        catch(error: any){
            console.error('Błąd podczas rejestracji użytkownika:', error.message);
            alert('Błąd: ' + error.message);
        }
    }

    return (
        <SafeAreaView className={"flex-1"}>
            <LoginSignupHeader/>
            <View className={"flex flex-col p-12 flex-1 justify-between"}>
                <View>
                    <CustomInput type={"email"} onChange={val => setEmail(val)} val={email} placeholder={"E-mail"} />
                    <CustomInput type={"password"} onChange={val => setPassword(val)} val={password} placeholder={"Hasło"}/>
                    <CustomInput type={"password"} onChange={val => setRepassword(val)} val={repassword} placeholder={"Powtórz hasło"}/>
                    <CustomButton handlePress={signUp} title={"Zarejestruj"} buttonType={"primary"}/>
                    <TouchableOpacity onPress={handleSignupPress} className="mt-4">
                        <Text className="text-text text-center">Posiadasz konto? Zaloguj się!</Text>
                    </TouchableOpacity>
                </View>
                <LoginSignupFooter/>
            </View>
        </SafeAreaView>
    );
}
