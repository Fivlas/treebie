import { View, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState } from "react";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import { CustomInput } from "@/components/elements/CustomInput";
import CustomButton from "@/components/elements/CustomButton";
import { router } from "expo-router";
import { LoginSignupFooter } from "@/components/elements/LoginSignupFooter";
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import ChoseTeam from '@/components/ChoseTeam';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/functions/firebaseConfig';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isChosingTeam, setIsChosingTeam] = useState(false);
    const backgroundColor = useThemeColor({ light: "", dark: "" }, "background");

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            if (FIREBASE_AUTH.currentUser?.emailVerified) {
                await AsyncStorage.setItem('user', JSON.stringify({
                    uid: FIREBASE_AUTH.currentUser.uid,
                    email: FIREBASE_AUTH.currentUser.email,
                }));
                const userDocRef = doc(FIREBASE_DB, 'users', response.user.uid);
                const userDoc = await getDoc(userDocRef)
                if (userDoc.exists() && userDoc.data().team == "") {
                    setIsChosingTeam(true);
                } else {
                    router.replace("/(tabs)");
                }
            } else {
                if (FIREBASE_AUTH.currentUser != null)
                    await sendEmailVerification(FIREBASE_AUTH.currentUser);
                alert("Email został ponownie wysłany!")
            }
        }
        catch (error : any) {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Uwaga', 'Podany email nie jest przypisany do żadnego konta!');
            } 
            else if (error.code === 'auth/missing-password') {
                Alert.alert('Uwaga', 'Uzupełnij Hasło!');
            }
            else if (error.code === 'auth/invalid-credential') {
                Alert.alert('Uwaga', 'Hasło jest nie poprawne');
            }
            else if (error.code === 'auth/too-many-requests') {
                Alert.alert('Uwaga', 'Zweryfikuj swojego Maila');
            }
            else {
                console.error('Błąd podczas rejestracji użytkownika:', error.message);
                alert("Błąd podczas logowania użytkownika:" + error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleSignupPress = () => {
        router.replace("/signup");
    }

    const handleTreeSelect = async (team: string) => {
        const curUser = FIREBASE_AUTH.currentUser;
        if (curUser) {
            try {
                const userDocRef = doc(FIREBASE_DB, 'users', curUser.uid);
                await updateDoc(userDocRef, { team: team });
                router.replace("/(tabs)");
            } catch (error) {
                console.error("Error setting team:", error);
            }
        } else {
            console.log("No user is logged in.");
        }
    };

    return (
        <SafeAreaView className={"flex-1"} style={[{backgroundColor}]}>
            <LoginSignupHeader />
            {isChosingTeam ? <ChoseTeam onTreeSelect={handleTreeSelect} /> :
                <View className={"flex flex-col p-12 flex-1 justify-between"}>
                    <View>
                        <CustomInput type={"email"} onChange={val => setEmail(val)} val={email} placeholder={"E-mail"} />
                        <CustomInput type={"password"} onChange={val => setPassword(val)} val={password} placeholder={"Hasło"} />
                        <CustomButton title={"Zaloguj"} buttonType={"primary"} handlePress={signIn} />
                        <TouchableOpacity onPress={handleSignupPress} className="mt-4">
                            <Text className="text-text text-center">Nie masz konta? Zarejestruj się!</Text>
                        </TouchableOpacity>
                    </View>
                    <LoginSignupFooter  />
                </View>}
        </SafeAreaView>
    );
}