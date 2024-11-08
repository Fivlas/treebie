import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import React, { useState } from "react";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import {CustomInput} from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import { router } from "expo-router"; // Make sure to import the router object
import {LoginSignupFooter} from "@/components/elements/LoginSignupFooter";
import { FIREBASE_AUTH } from '@/firebase.config';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        try
        {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            console.log(response);
            if(FIREBASE_AUTH.currentUser?.emailVerified){
                await AsyncStorage.setItem('user', JSON.stringify({
                    uid: FIREBASE_AUTH.currentUser.uid,
                    email: FIREBASE_AUTH.currentUser.email,
                }));
                router.replace("/(tabs)");
            }else{
                if(FIREBASE_AUTH.currentUser != null)
                    await sendEmailVerification(FIREBASE_AUTH.currentUser);
                    alert("Email został ponownie wysłany!")
            }
        }
        catch(error)
        {
            console.log(error)
            alert("Błąd podczas logowania użytkownika:" + error);
        }
        finally
        {
            setLoading(false)
        }
    }

    const handleSignupPress = () => {
        router.replace("/signup"); // Use the router object to navigate to the "/signup" route
    }

    return (
        <SafeAreaView className={"flex-1"}>
            <LoginSignupHeader/>
            <View className={"flex flex-col p-12 flex-1 justify-between"}>
                <View>
                    <CustomInput type={"email"} onChange={val => setEmail(val)} val={email} placeholder={"E-mail"}/>
                    <CustomInput type={"password"} onChange={val => setPassword(val)} val={password} placeholder={"Hasło"}/>
                    <CustomButton title={"Zaloguj"} buttonType={"primary"} handlePress={signIn}/>
                    <TouchableOpacity onPress={handleSignupPress} className="mt-4">
                        <Text className="text-text text-center">Nie masz konta? Zarejestruj się!</Text>
                    </TouchableOpacity>
                </View>
                <LoginSignupFooter/>
            </View>
        </SafeAreaView>
    );
}