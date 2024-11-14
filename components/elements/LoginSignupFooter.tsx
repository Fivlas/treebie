import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Href, router } from "expo-router";

interface LoginSignupFooterProps {
    register?: boolean;
}
export function LoginSignupFooter({ register } : LoginSignupFooterProps) {
    const finalredirect = register ? "signup" : "login";

    const handleLinkPress = (link: string) => {
        if (link === "privacy") {
            router.replace(`/(auth)/privacy?redirect=${finalredirect}` as Href);
        } else if (link === "terms") {
            router.replace(`/(auth)/tos?redirect=${finalredirect}` as Href);
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