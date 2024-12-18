import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../styles/global.css'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_PREFERENCE_KEY, useColorScheme } from '@/hooks/useColorScheme';
import { Appearance, StatusBar } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const loadThemePreference = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
      if (savedTheme !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Appearance.setColorScheme(savedTheme);
      }
    };
    loadThemePreference();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tip/[id]/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/privacy" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/tos" options={{ headerShown: false }} />
        <Stack.Screen name="ai/index" options={{ headerShown: false }} />
        <Stack.Screen name="challenge/[id]/index" options={{ headerShown: false }} />
        <Stack.Screen name="all/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}