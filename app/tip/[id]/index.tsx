/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/elements/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { Href, useLocalSearchParams, router } from "expo-router";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase.config";
import TipListElement from "@/components/TipsPage/TipListElement";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type TipFields = {
    title: string;
    description: string;
    list: string[];
};

const Index = () => {
    const local = useLocalSearchParams();
    let redirect = "/(tabs)/"
    if (local.redirect) {
        redirect = local.redirect === "liked" ? "/all?allType=liked" : "/all?allType=all";
    }
    const [liked, setLiked] = useState(false);
    const [tip, setTip] = useState<TipFields | undefined>(undefined);
    const [likeId, setLikeId] = useState<string>();
    const USERID = "1";

    useEffect(() => {
        const getData = async (id: string) => {
            try {
                const docRef = doc(FIREBASE_DB, "tips", id);
                const res = await getDoc(docRef);
                if (res.exists()) {
                    setTip(res.data() as TipFields);
                } else {
                    console.warn("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
                router.replace("/(tabs)/");
            }
        };

        const fetchLikes = async (id: string) => {
            try {
                const likedRef = collection(FIREBASE_DB, "likedTips");
                const LikesQuery = query(
                    likedRef,
                    where("userId", "==", USERID),
                    where("tipId", "==", id)
                );

                const querySnapshot = await getDocs(LikesQuery);
                const likesList = querySnapshot.docs.map((doc) => doc.data());
                const isLiked = !!likesList.length;
                setLiked(isLiked);
                if (isLiked) {
                    const likeDocId = querySnapshot.docs[0].id;
                    setLikeId(likeDocId)
                }
            } catch (err) {
                console.error("Error fetching likes:", err);
            }
        };

        if (local.id) {
            getData(local.id.toString());
            fetchLikes(local.id.toString());
        }
    }, [local.id]);

    const likeHandler = async () => {
        try {
            setLiked((prevLiked) => !prevLiked);
            if (liked) {
                if (!likeId) throw new Error("like id not found")
                await deleteDoc(doc(FIREBASE_DB, "likedTips", likeId));

            } else {
                const docRef = await addDoc(collection(FIREBASE_DB, "likedTips"), {
                    tipId: local.id.toString(),
                    userId: USERID,
                    timestamp: Date.now()
                });
                setLikeId(docRef.id.toString())
            }
        } catch (e) {
            console.log(e)
        }
    };

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

                            <TouchableOpacity className="p-4 rounded-2xl bg-[#798156]" onPress={likeHandler}>
                                <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? "red" : "white"} />
                            </TouchableOpacity>
                        </View>

                        <Image source={require("@/assets/images/logo-icon-new.png")} className="w-full h-64" />
                    </ImageBackground>
                </View>

                <View className="mt-8 px-8">
                    <ThemedText className="text-3xl tracking-widest font-bold">
                        {tip?.title}
                    </ThemedText>
                    <ThemedText className="mt-2 font-light opacity-80 leading-relaxed">
                        {tip?.description}
                    </ThemedText>

                    {tip?.list && (
                        <View>
                            <ThemedText className="text-xl mt-8 tracking-widest font-bold">Some Tips</ThemedText>
                            <View className="mt-4 gap-4 mb-16">
                                {tip.list.map((dot, index) => (
                                    <TipListElement key={index} text={dot} image="" />
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            <CustomButton
                containerStyles="w-[80%] absolute bottom-8 self-center"
                title="Zapytaj AI"
                buttonType="primary"
                textStyles="font-bold text-3xl"
            />
        </ThemedView>
    );
};

export default Index;
