import ScrollCard from '@/components/HomePage/ScrollCard';
import { FIREBASE_DB } from '@/firebase.config';
import { shuffleArray } from '@/functions/shuffleArray';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Index = () => {
    const { allType } = useLocalSearchParams();

    const [allTips, setAllTips] = useState<TipFields[]>([]);
    const [displayedTips, setDisplayedTips] = useState<TipFields[]>([]);
    const [likedTipsList, setLikedTipsList] = useState<TipFields[]>([]);
    const USERID = "1";

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const tipsCollectionRef = collection(FIREBASE_DB, "tips");
                const tipsQuery = query(tipsCollectionRef, orderBy('popularity', 'desc'));
                const querySnapshot = await getDocs(tipsQuery);

                const fetchedTips: TipFields[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data() as TipData
                }));

                setAllTips(fetchedTips);
                setDisplayedTips(shuffleArray([...fetchedTips]).slice(0, 20));

                fetchLikedTips(fetchedTips); // Call after fetching all tips
            } catch (e) {
                console.log("Error fetching tips data from Firestore: ", e);
            }
        };

        const fetchLikedTips = async (fetchedTips: TipFields[]) => {
            try {
                const likedRef = collection(FIREBASE_DB, "likedTips");
                const likesQuery = query(likedRef, where("userId", "==", USERID));
                const querySnapshot = await getDocs(likesQuery);
                const likesList = querySnapshot.docs.map((doc) => doc.data());

                if (!likesList.length) return;

                const tipIds = likesList.map((like) => like.tipId);
                const likedTips = fetchedTips.filter(tip => tipIds.includes(tip.id));

                setLikedTipsList(likedTips);
            } catch (err) {
                console.error("Error fetching liked tips:", err);
            }
        };

        fetchTips();
    }, []);

    function displayTips(): JSX.Element[] {
        const tipsToDisplay = allType === "liked" ? likedTipsList : displayedTips;

        return tipsToDisplay
            .reduce<TipFields[][]>((rows, card, index) => {
                if (index % 2 === 0) rows.push([]);
                rows[rows.length - 1].push(card);
                return rows;
            }, [])
            .map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row justify-between mt-7">
                    {row.map((card) => (
                        <ScrollCard redirect={`${allType === "liked" ? "liked" : "all"}`} key={card.id} id={card.id} imageName={card.imageName} title={card.title} />
                    ))}
                </View>
            ));
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-row items-center px-8 mt-2">
                <TouchableOpacity
                    className="p-3 rounded-lg bg-[#798156] mr-3"
                    onPress={() => router.replace("/(tabs)/")}
                >
                    <Ionicons name="chevron-back-outline" size={18} color="white" />
                </TouchableOpacity>
                <Text className="text-4xl font-semibold text-gray-800">
                    {allType === "liked" ? "Polubione" : "Wszystkie"}
                </Text>
            </View>
            <ScrollView className="mt-8 px-8">
                {displayTips()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;
