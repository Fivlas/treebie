import {ImageBackground, ScrollView, Text, TextInput, View} from "react-native";
import SectionText from "@/components/HomePage/SectionText";
import ScrollCard from "@/components/HomePage/ScrollCard";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {FIREBASE_DB} from "@/firebase.config";
import {shuffleArray} from "@/functions/shuffleArray";
import {Ionicons} from "@expo/vector-icons";

const Shop = () => {
    const [shopItems, setShopItems] = useState<ShopItem[]>([]);
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
        }
        fetchItems();
    }, []);
    return <View className="mt-8">
        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
            <View style={{ overflow: 'hidden', borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
                <ImageBackground
                    source={require('@/assets/images/banner-image.png')}
                    className="bg-[#63784f] pt-[85px] pb-14 px-8 flex gap-2"
                    style={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                >
                    <Text className="text-4xl tracking-widest font-bold text-secondary">
                        Treebie
                    </Text>
                    <Text className="text-3xl tracking-widest font-bold text-secondary">
                        Ucz się, działaj, zgarniaj
                    </Text>

                </ImageBackground>
            </View>
            <SectionText title='Sklep' containerStyles='px-8'/>

            <ScrollView className="flex-row pl-8" horizontal showsHorizontalScrollIndicator={false} decelerationRate={0}
                        snapToInterval={200} snapToAlignment={"start"} contentContainerClassName='pr-8'>
                {shopItems.slice(0, 5).map((item) => {
                    return <ScrollCard key={`all-${item.id}`} id={item.id} imageName='logo-icon-new.png'
                                       title={item.name} containerStyle='mr-4' routeBase={"shop"} />
                })}
            </ScrollView>
        </ScrollView>
    </View>;
}

export default Shop;