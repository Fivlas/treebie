import Message from '@/components/Ai/Message';
import SkeletonMessage from '@/components/Ai/SkeletonMessage';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

const Index = () => {
    const userMessageParam = (useLocalSearchParams().text as string) || null;
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = async (userMessage: string = ""): Promise<void> => {
        if (isFetching || (!userMessage && !inputValue)) return;

        const messageText = userMessage || inputValue;

        setMessages((prevMessages) => [
            ...prevMessages,
            { message: messageText, isAi: false },
        ]);
        setInputValue("");
        scrollViewRef.current?.scrollToEnd({ animated: true });

        setIsFetching(true);
        try {
            const aiResponse: string = await fetchAiResponse(messageText);

            setMessages((prevMessages) => [
                ...prevMessages,
                { message: aiResponse, isAi: true },
            ]);

            scrollViewRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
            console.error("Failed to fetch AI response", error);
        } finally {
            setIsFetching(false);
        }
    };

    const fetchAiResponse = async (prompt: string): Promise<string> => {
        const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;


        const requestBody = {
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "Witaj na ekologicznym czacie z ChatGPT! 🌍🍃\n\n" +
                        "To miejsce, w którym porozmawiamy o ekologii, zrównoważonym rozwoju i wszystkim, co dotyczy ochrony naszej planety. Możesz zadawać pytania dotyczące:\n\n" +
                        "Zadaj mi swoje pytanie lub poproś o eko-poradę, a razem znajdziemy sposób, by uczynić Twój styl życia bardziej przyjaznym dla środowiska! 🌱💚\n\n" +
                        "Wpisz swoje pytanie, a ja chętnie na nie odpowiem! Odpowiadaj krótko, zwięźle i na temat"
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch AI response");
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    };

    useEffect(() => {
        if (userMessageParam) {
            handleSend(userMessageParam);
        }
    }, [userMessageParam]);

    const backgroundColor = useThemeColor({ light: "", dark: "" }, 'background');
    return (
        <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
            {/* Header */}
            <View className="flex-row items-center px-8 mt-2">
                <TouchableOpacity
                    className="p-3 rounded-lg bg-[#798156] mr-3"
                    onPress={() => router.replace("/(tabs)/")}
                >
                    <Ionicons name="chevron-back-outline" size={18} color="white" />
                </TouchableOpacity>
                <ThemedText className="text-4xl font-semibold text-gray-800">
                    Eco Chat
                </ThemedText>
            </View>

            {/* Scrollable Content */}
            <ScrollView className="mt-8 px-8 mb-20" contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
                <View className="gap-4">
                    {/* Wiadomość powitalna */}
                    <Message
                        message={`Witaj na ekologicznym czacie ze Sztuczną Inteligencją! 🌍🍃

To miejsce, w którym porozmawiamy o ekologii, zrównoważonym rozwoju i wszystkim, co dotyczy ochrony naszej planety.

Zadaj mi swoje pytanie lub poproś o eko-poradę, a razem znajdziemy sposób, by uczynić Twój styl życia bardziej przyjaznym dla środowiska! 🌱💚

Wpisz swoje pytanie, a ja chętnie na nie odpowiem!`}
                        isAi={true}
                    />

                    {/* Renderowanie wiadomości użytkownika i AI */}
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message.message}
                            isAi={message.isAi}
                        />
                    ))}

                    {/* Szablon ładowania wiadomości */}
                    {isFetching && <SkeletonMessage />}
                </View>
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
                style={{ position: 'absolute', bottom: 0, width: '100%' }}
            >
                <View className="pt-2 pb-6  border-t border-[#e0e0e0]" style={[{ backgroundColor }]}>
                    <View className="flex-row items-center rounded-lg p-4" style={[{ backgroundColor }]}>
                        <TextInput
                            className="flex-1 mx-2 text-gray-700"
                            placeholder="Zadaj pytanie ECO asystentowi"
                            placeholderTextColor="#63784f"
                            multiline={true}
                            value={inputValue}
                            onChangeText={text => setInputValue(text)}
                            editable={!isFetching}
                        />
                        <Feather name="send" size={24} color="#202f11" className="mr-2" onPress={() => handleSend()} />
                    </View>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

export default Index;
