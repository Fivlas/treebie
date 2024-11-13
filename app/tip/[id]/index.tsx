import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/elements/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { Href, useLocalSearchParams, router } from "expo-router";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase.config";
import TipListElement from "@/components/TipsPage/TipListElement";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";

type TipFields = {
    title: string;
    description: string;
    list: string[];
    imageName: string;
};

const Index = () => {
    const local = useLocalSearchParams();
    let redirect = "/(tabs)/";
    if (local.redirect) {
        redirect = local.redirect === "liked" ? "/all?allType=liked" : "/all?allType=all";
    }

    const [liked, setLiked] = useState(false);
    const [tip, setTip] = useState<TipFields | undefined>(undefined);
    const [likeId, setLikeId] = useState<string>();
    const { user, loading } = useUser ();
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Tip Data and User Likes
    useEffect(() => {
        const getData = async (id: string) => {
            try {
                setIsLoading(true);
                const docRef = doc(FIREBASE_DB, "tips", id);
                const res = await getDoc(docRef);
                if (res.exists()) {
                    setTip(res.data() as TipFields);
                } else {
                    console.warn("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
                router.replace("/(tabs)/" as Href);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchLikes = async (id: string) => {
            try {
                if (!user || loading) return;
                const likedRef = collection(FIREBASE_DB, "likedTips");
                const LikesQuery = query(
                    likedRef,
                    where("userId", "==", user.uid),
                    where("tipId", "==", id)
                );

                const querySnapshot = await getDocs(LikesQuery);
                const likesList = querySnapshot.docs.map((doc) => doc.data());
                const isLiked = !!likesList.length;
                setLiked(isLiked);

                if (isLiked) {
                    const likeDocId = querySnapshot.docs[0].id;
                    setLikeId(likeDocId);
                }
            } catch (err) {
                console.error("Error fetching likes:", err);
            }
        };

        if (local.id) {
            getData(local.id.toString());
            fetchLikes(local.id.toString());
        }
    }, [local.id, user, loading]);

    // Handle Like/Unlike
    const likeHandler = async () => {
        if (!user) {
            console.warn("User  not logged in");
            return;
        }

        try {
            setLiked((prevLiked) => !prevLiked);

            if (liked) {
                if (!likeId) throw new Error("Like ID not found");
                await deleteDoc(doc(FIREBASE_DB, "likedTips", likeId));
                setLikeId(undefined);
            } else {
                const docRef = await addDoc(collection(FIREBASE_DB, "likedTips"), {
                    tipId: local.id.toString(),
                    userId: user.uid,
                    timestamp: Date.now(),
                });
                setLikeId(docRef.id);
            }
        } catch (e) {
            console.error("Error updating like status:", e);
        }
    };

    if ( isLoading || loading) {
        return (
            <ThemedView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#63784f" />
            </ThemedView>
        );
    }

    const redirectAIHandler = () => {
        const text = `Daj mi eco-poradę na temat **${tip?.title}**`;
        router.replace(`/ai?text=${text}` as Href);
    }

    return (
        <ThemedView className="flex-1">
            <View style={{ paddingBottom: 100 }}>
                <View style={{ overflow: "hidden", borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
                    <ImageBackground
                        source={require("@/assets/images/banner-image.png")}
                        className={`bg-[#63784f] ${Platform.OS === "ios" ? "pt-[60px]" : "pt-7"} pb-14 px-8 flex gap-2`}
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

                        <Image source={{ uri: tip?.imageName }} className="h-72 w-72 mx-auto" />
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
                            <ThemedText className="text-xl mt-4 tracking-widest font-bold">Rady</ThemedText>
                            <View className="mt-4 gap-4 mb-16">
                                {tip.list.map((dot, index) => (
                                    <TipListElement key={index} text={dot} image={tip?.imageName} />
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </View>

            <CustomButton
                containerStyles={`w-[80%] absolute ${Platform.OS === 'android' ? "bottom-2" : "bottom-7"} self-center`}
                title="Zapytaj AI"
                buttonType="primary"
                textStyles="font-bold text-3xl"
                handlePress={redirectAIHandler}
            />
        </ThemedView>
    );
};

export default Index;