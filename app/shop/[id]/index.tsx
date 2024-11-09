/* eslint-disable @typescript-eslint/no-require-imports */
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/elements/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase.config";
import TipListElement from "@/components/TipsPage/TipListElement";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type TipFields = {
    title: string;
    description: string;
    list: string[];
};

const Index = () => {
    const local = useLocalSearchParams();
    let redirect = "/shop"
    if (local.redirect) {
        redirect = local.redirect === "liked" ? "/shop?allType=liked" : "/shop?allType=all";
    }
    const [liked, setLiked] = useState(false);
    const [item, setItem] = useState<ShopItem | undefined>(undefined);
    const USERID = "1";

    useEffect(() => {
        const getData = async (id: string) => {
            try {
                const docRef = doc(FIREBASE_DB, "shop", id);
                const res = await getDoc(docRef);
                if (res.exists()) {
                    setItem(res.data() as ShopItem);
                } else {
                    console.warn("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
                router.replace("/(tabs)/");
            }
        };

        
        if (local.id) {
            getData(local.id.toString());
        }
    }, [local.id]);

    return (
        <ThemedView className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{ overflow: "hidden", borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
                    <ImageBackground
                        source={require("@/assets/images/banner-image.png")}
                        className="bg-[#63784f] pt-[60px] pb-14 px-8 flex gap-2"
                        style={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                    >
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className="p-4 rounded-2xl bg-[#798156]"
                                onPress={() => router.replace(redirect as Href)}
                            >
                                <Ionicons name="chevron-back-outline" size={18} color="white" />
                            </TouchableOpacity>
                        </View>

                        <Image source={require("@/assets/images/logo-icon-new.png")} className="w-full h-64" />
                    </ImageBackground>
                </View>

                <View className="mt-8 px-8">
                    <ThemedText className="text-3xl tracking-widest font-bold">
                        {item?.name}
                    </ThemedText>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

export default Index;
