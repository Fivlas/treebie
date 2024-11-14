/* eslint-disable @typescript-eslint/no-require-imports */
import { SafeAreaView, Switch, Text, View, TouchableHighlight, Appearance, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { ThemedText } from '@/components/ThemedText';
import { THEME_PREFERENCE_KEY } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Settings() {
    const [darkTheme, setDarkTheme] = useState<boolean>(false);

    const canChangeTheme = typeof Appearance.setColorScheme === "function";

    useEffect(() => {
        const fetchThemePreference = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
                if (storedTheme) {
                    setDarkTheme(storedTheme === 'dark');
                }
            } catch (error) {
                console.error("Failed to fetch theme preference:", error);
            }
        };

        fetchThemePreference();
    }, []);

    useEffect(() => {
        if (canChangeTheme) {
            Appearance.setColorScheme(darkTheme ? "dark" : "light");
        }
        AsyncStorage.setItem(THEME_PREFERENCE_KEY, darkTheme ? "dark" : "light");
    }, [darkTheme]);

    const logout = () => {
        AsyncStorage.removeItem('user');
        router.replace('/(auth)/login' as Href);
    };

    const backgroundColor = useThemeColor(
        { light: "", dark: "" },
        "background"
    );

    return (
        <SafeAreaView className={"flex-1"} style={[{ backgroundColor }]}>
            <Image source={require('../../assets/images/logo-icon.png')} className={"w-full h-28 object-contain"} style={{ width: '100%', height: 112, resizeMode: 'contain' }} />
            <ThemedText type='title' className='px-8'>Ustawienia</ThemedText>

            <View className={"mt-10 border-t border-primary border-b border-solid p-4"}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <ThemedText className='text-xl p-3 font-semibold'>Użyj ciemny motyw</ThemedText>
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
                            onValueChange={setDarkTheme}
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
                </View>
            </View>
            <View className={"border-primary border-b border-solid p-4"}>
                <TouchableOpacity onPress={() => logout()}>
                    <Text className={`text-xl p-3 text-[#B91C1C] text-center font-semibold`}>Wyloguj się</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
