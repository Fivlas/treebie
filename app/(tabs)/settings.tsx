import {SafeAreaView, Switch, Text, View, TouchableHighlight, Appearance} from 'react-native';
import React, {useEffect, useState} from "react";
import {ThemedText} from '@/components/ThemedText';
import {THEME_PREFERENCE_KEY} from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                <ThemedText type='title'>Ustawienia</ThemedText>
                <TouchableHighlight>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text className={darkTheme ? "text-white" : "text-text"}>Użyj ciemny motyw</Text>
                        <Switch
                            disabled={!canChangeTheme}
                            value={darkTheme}
                            onValueChange={changeDarkToggle}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}
