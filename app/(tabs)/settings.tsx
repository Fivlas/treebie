import {SafeAreaView, Switch, Text, TouchableHighlight, useColorScheme, Appearance} from 'react-native';

import React, { useEffect, useState } from "react";
import { ThemeProvider } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';


export default function Settings() {
    const theme = useColorScheme() as "dark" | "light" | undefined;
    const [darkTheme, changeDarkToggle] = useState<boolean>(false);
    const canChangeTheme = typeof (Appearance.setColorScheme) === "function";
    useEffect(() => {
        if (canChangeTheme) Appearance.setColorScheme(darkTheme ? "dark" : "light");
    }, [darkTheme]);
    return (
        <SafeAreaView>
            <ThemeProvider value={theme ?? "light"}>
                <ThemedText type='title'>Ustawienia</ThemedText>
                <TouchableHighlight>
                    <Switch disabled={!canChangeTheme} value={darkTheme} onValueChange={changeDarkToggle}>Użyj ciemny motyw</Switch>
                </TouchableHighlight>
            </ThemeProvider>
        </SafeAreaView>
    );
}
