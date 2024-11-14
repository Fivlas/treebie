import {View, SafeAreaView, TouchableOpacity, Text, Alert} from 'react-native';

import LoginSignupHeader from "@/components/LoginSignupHeader";
import {CustomInput} from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import {router} from "expo-router";
import {LoginSignupFooter} from "@/components/elements/LoginSignupFooter";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebase.config';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const backgroundColor = useThemeColor({ light: "", dark: "" }, "background");

    const handleSignupPress = () => {
        router.replace("/login")
    }

    const signUp = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (!emailRegex.test(email)) {
                Alert.alert('Uwaga', 'Podaj poprawny adres e-mail');
                return;
            }
    
            if (password.length < 6) {
                Alert.alert('Uwaga', 'Hasło musi mieć co najmniej 6 znaków');
                return;
            }
    
            if (password !== repassword) {
                Alert.alert('Uwaga', 'Hasła nie są identyczne');
                return;
            }
    
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    
            await sendEmailVerification(response.user);
            Alert.alert('Mail', 'Mail weryfikacyjny został wysłany na adres ' + email);
    
            if (response.user) {
                const userDocRef = doc(FIREBASE_DB, 'users', response.user.uid);
                await setDoc(userDocRef, { 
                    email: response.user.email,
                    treeProgress: 0,
                    team: "",
                    questsDone: {},
                    items: {}
                });
                router.replace("/login");
            } else {
                console.error('Użytkownik nie jest zalogowany.');
            }
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Uwaga', 'Podany adres e-mail jest już w użyciu');
            } else {
                console.error('Błąd podczas rejestracji użytkownika:', error.message);
                Alert.alert('Błąd', error.message);
            }
        }
    };
    
    

    return (
        <SafeAreaView className={"flex-1"} style={[{backgroundColor}]}>
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
            <LoginSignupFooter register/>
            </View>
        </SafeAreaView>
    );
}
