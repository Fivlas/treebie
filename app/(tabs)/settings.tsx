import {SafeAreaView, Switch, Text, View, TouchableHighlight, Appearance, Image} from 'react-native';
import React, {useEffect, useState} from "react";
import {ThemedText} from '@/components/ThemedText';
import {THEME_PREFERENCE_KEY} from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from '@/components/elements/CustomButton';
import { router } from 'expo-router';

export default function Settings() {
    const [darkTheme, changeDarkToggle] = useState<boolean>(false);
    const canChangeTheme = typeof (Appearance.setColorScheme) === "function";
    useEffect(() => {
        if (canChangeTheme) Appearance.setColorScheme(darkTheme ? "dark" : "light");
        AsyncStorage.setItem(THEME_PREFERENCE_KEY, darkTheme ? "dark" : "light");
    }, [darkTheme]);
    return (
        <SafeAreaView className={"flex-1 p-12 mt-10"}>
            <View>
                <Image  source={require('../../assets/images/logo-icon.png')} className={"w-full h-28 object-contain"} style={{ width: '100%', height: 112, resizeMode: 'contain' }}/>
                <ThemedText type='title'>Ustawienia</ThemedText>
                <TouchableHighlight className={"mt-10 border-t border-primary border-b border-solid p-4"}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text className={`text-xl p-3 ${(darkTheme ? "text-white" : "text-text")}`}>Użyj ciemny motyw</Text>
                        <View
                            style={{
                                width: 60,
                                height: 34,
                                borderRadius: 17,
                                backgroundColor: darkTheme ? "#4caf50" : "#d3d3d3",
                                padding: 4,
                                justifyContent: "center"
                            }}
                        >
                            <Switch
                                disabled={!canChangeTheme}
                                value={darkTheme}
                                onValueChange={changeDarkToggle}
                                thumbColor={darkTheme ? "#ffffff" : "#f4f4f4"}
                                trackColor={{
                                    false: "#d3d3d3",
                                    true: "#4caf50"
                                }}
                                style={{
                                    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
                                    alignSelf: darkTheme ? "flex-end" : "flex-start",
                                }}
                            />

                        </View>
                            <CustomButton title='login' buttonType='primary' handlePress={() => router.push('/login')}/>
                            <CustomButton title='signup' buttonType='primary' handlePress={() => router.push('/signup')}/>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}