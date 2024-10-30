import {SafeAreaView, Switch, Text, View, TouchableHighlight, useColorScheme, Appearance} from 'react-native';

import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@react-navigation/native';
import {ThemedText} from '@/components/ThemedText';
import {Colors} from '@/constants/Colors';


export default function Settings() {
    const theme = useColorScheme() as "dark" | "light" | undefined;
    const [darkTheme, changeDarkToggle] = useState<boolean>(false);
    const canChangeTheme = typeof (Appearance.setColorScheme) === "function";
    useEffect(() => {
        if (canChangeTheme) Appearance.setColorScheme(darkTheme ? "dark" : "light");
    }, [darkTheme]);
    return (
        <SafeAreaView className={"flex-1 p-12 mt-10 flex flex-col items-center"}>
            <View>
                <ThemedText type='title'>Ustawienia</ThemedText>
                <TouchableHighlight>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
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
