import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native'

const TermsOfUse = () => {
    const local = useLocalSearchParams();

    let redirect = "/(auth)/login";
    if (local.redirect) {
        redirect = local.redirect === "login" ? "/(auth)/login" : "/(auth)/signup";
    }

    const backgroundColor = useThemeColor({ light: "", dark: "" }, "background");
    return (
        <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
            <View className="flex-row items-center px-8 mt-2">
                <TouchableOpacity
                    className="p-3 rounded-lg bg-[#798156] mr-3"
                    onPress={() => router.replace(redirect as Href)}
                >
                    <Ionicons
                        name="chevron-back-outline"
                        size={18}
                        color="white"
                    />
                </TouchableOpacity>
                <ThemedText className="text-4xl font-semibold">
                    Warunki użytkowania
                </ThemedText>
            </View>
            
            <ScrollView className="mt-3 px-8">
                <ThemedText className="mb-3 font-bold">
                    1. Akceptacja warunków
                </ThemedText>
                <ThemedText className="mb-3">
                    Korzystając z aplikacji Treebie, zgadzasz się na przestrzeganie poniższych warunków użytkowania.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    2. Rejestracja i konto użytkownika
                </ThemedText>
                <ThemedText className="mb-3">
                    Aby korzystać z aplikacji, musisz założyć konto. Jesteś odpowiedzialny za poufność swojego hasła.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    3. Odpowiedzialność użytkownika
                </ThemedText>
                <ThemedText className="mb-3">
                    Zobowiązujesz się do korzystania z aplikacji zgodnie z prawem i niniejszymi warunkami.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    4. Własność intelektualna
                </ThemedText>
                <ThemedText className="mb-3">
                    Wszelkie prawa do treści w aplikacji są zastrzeżone. Kopiowanie i używanie tych materiałów bez zgody jest zabronione.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    5. Zmiany w warunkach użytkowania
                </ThemedText>
                <ThemedText className="mb-3">
                    Administrator zastrzega sobie prawo do zmiany warunków użytkowania w dowolnym momencie.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    6. Prywatność i dane osobowe
                </ThemedText>
                <ThemedText className="mb-3">
                    Twoje dane osobowe są przetwarzane zgodnie z naszą Polityką Prywatności.
                </ThemedText>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TermsOfUse;
