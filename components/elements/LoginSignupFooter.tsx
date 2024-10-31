import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "expo-router";

export function LoginSignupFooter() {
    const navigation = useNavigation();
    const handleLinkPress = (link: string) => {
        if (link === "privacy") {
            // Navigate to Privacy Policy screen
            navigation.navigate("PrivacyPolicy"); // Replace with your actual screen name
        } else if (link === "terms") {
            // Navigate to Terms of Service screen
            navigation.navigate("TermsOfService"); // Replace with your actual screen name
        }
    }
    return (<View className="mt-6 flex flex-row justify-center">
        <TouchableOpacity onPress={() => handleLinkPress("privacy")}>
            <Text className="text-text">Polityka prywatności</Text>
        </TouchableOpacity>
        <Text className="text-gray-200 mx-2">•</Text>
        <TouchableOpacity onPress={() => handleLinkPress("terms")}>
            <Text className="text-text">Warunki użytkowania</Text>
        </TouchableOpacity>
    </View>);
}