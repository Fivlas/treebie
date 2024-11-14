import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Href, router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native'

const Privacy = () => {
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
                    Polityka Prywatności
                </ThemedText>
            </View>
            
            <ScrollView className="mt-3 px-8">
                <ThemedText className="mb-3 font-bold">
                    1. Jakie dane zbieramy?
                </ThemedText>
                <ThemedText className="mb-3">
                    Zbieramy dane takie jak adres e-mail, zahasowane hasło, dane o polubionych poradach, postępie drzewa, wykonanych zadaniach oraz aktualnym zadaniu.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    2. Jak wykorzystujemy Twoje dane?
                </ThemedText>
                <ThemedText className="mb-3">
                    Twoje dane wykorzystujemy w celu zarządzania kontem użytkownika, personalizacji treści, śledzenia postępów i komunikacji.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    3. Jak przechowujemy Twoje dane?
                </ThemedText>
                <ThemedText className="mb-3">
                    Twoje dane przechowujemy w bezpieczny sposób na naszych serwerach.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    4. Twoje prawa
                </ThemedText>
                <ThemedText className="mb-3">
                    Masz prawo do dostępu, poprawiania, usunięcia danych oraz innych praw związanych z ochroną danych osobowych.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    5. Zabezpieczenie danych
                </ThemedText>
                <ThemedText className="mb-3">
                    Dokładamy wszelkich starań, aby Twoje dane były bezpieczne, stosując odpowiednie technologie szyfrowania i środki ochrony.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    6. Zmiany w Polityce Prywatności
                </ThemedText>
                <ThemedText className="mb-3">
                    Zastrzegamy sobie prawo do wprowadzania zmian w Polityce Prywatności. O wszelkich zmianach będziemy Cię informować.
                </ThemedText>
                <ThemedText className="mb-3 font-bold">
                    7. Kontakt
                </ThemedText>
                <ThemedText className="mb-3">
                    Jeśli masz pytania, skontaktuj się z nami pod adresem e-mail: filip.skoczylas777007@gmail.com
                </ThemedText>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Privacy;
