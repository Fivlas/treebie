import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {collection, getDocs, query} from "firebase/firestore";
import {FIREBASE_DB} from "@/firebase.config";
import {shuffleArray} from "@/functions/shuffleArray";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {ThemedText} from "@/components/ThemedText";
import ScrollCard from "@/components/HomePage/ScrollCard";

function Index() {
    const [shopItems, setShopItems] = useState<ShopItem[]>([]);
    const [displayShopItems, setDisplayShopItems] = useState<ShopItem[]>([]);
    useEffect(() => {

        const fetchItems = async () => {
            const shopCollectionReference = collection(FIREBASE_DB, "shop");
            const shopQuery = query(shopCollectionReference);
            const querySnapshot = await getDocs(shopQuery);

            const fetchedTips: ShopItem[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as ShopItemData
            }));

            setShopItems(fetchedTips);
            setDisplayShopItems(shuffleArray([...fetchedTips]).slice(0, 20));
        }
        fetchItems();
    }, []);

    function displayItems(): JSX.Element[] {
        return displayShopItems
            .reduce<ShopItem[][]>((rows, card, index) => {
                if (index % 2 === 0) rows.push([]);
                rows[rows.length - 1].push(card);
                return rows;
            }, [])
            .map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row justify-between mt-7">
                    {row.map((card) => (
                        <ScrollCard key={card.id} id={card.id}
                                    imageName={card.image} title={card.name}/>
                    ))}
                </View>
            ));
    }

    return <SafeAreaView className="flex-1">
        <View className="flex-row items-center px-8 mt-2">
            <TouchableOpacity
                className="p-3 rounded-lg bg-[#798156] mr-3"
                onPress={() => router.replace("/shop")}
            >
                <Ionicons name="chevron-back-outline" size={18} color="white"/>
            </TouchableOpacity>
        </View>
        <ScrollView className="mt-8 px-8">
            {displayItems()}
        </ScrollView>
    </SafeAreaView>
}

export default Index;