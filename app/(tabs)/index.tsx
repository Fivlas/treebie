/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import { TextInput, ScrollView, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { FIREBASE_DB } from '@/firebase.config';
import { shuffleArray } from '@/functions/shuffleArray';
import SectionText from '@/components/HomePage/SectionText';
import ScrollCard from '@/components/HomePage/ScrollCard';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@/hooks/useUser';

const HomeScreen = () => {
  const [allTips, setAllTips] = useState<TipFields[]>([]);
  const [displayedTips, setDisplayedTips] = useState<TipFields[]>([]);
  const [likedTipsList, setLikedTipsList] = useState<TipFields[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const { user, loading } = useUser();

  // Fetch tips and liked tips
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const tipsCollectionRef = collection(FIREBASE_DB, "tips");
        const tipsQuery = query(tipsCollectionRef, orderBy('popularity', 'desc'));
        const querySnapshot = await getDocs(tipsQuery);

        const fetchedTips: TipFields[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as TipData,
        }));

        setAllTips(fetchedTips);
        setDisplayedTips(shuffleArray([...fetchedTips]));

        if (user) {
          await fetchLikedTips(fetchedTips);
        }
      } catch (e) {
        console.log("Error fetching tips data from Firestore: ", e);
      }
    };

    const fetchLikedTips = async (fetchedTips: TipFields[]) => {
      try {
        const likedRef = collection(FIREBASE_DB, "likedTips");
        if (!user) return;

        const LikesQuery = query(likedRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(LikesQuery);

        const likesList = querySnapshot.docs.map((doc) => doc.data());
        if (!likesList.length) return;

        const tipIds = likesList.map((like) => like.tipId);
        const likedTips = fetchedTips.filter(tip => tipIds.includes(tip.id));

        setLikedTipsList(likedTips);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    if (!loading) {
      fetchTips();
    }
  }, [loading, user]);

  const displayTips = (hm: number = 20): JSX.Element[] => {
    const rows = displayedTips
      .slice(0, hm)
      .reduce<TipFields[][]>((rows, card, index) => {
        if (index % 2 === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(card);
        return rows;
      }, [])
      .map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mt-7">
          {row.map((card) => (
            <ScrollCard key={card.id} id={card.id} imageName={card.imageName} title={card.title} />
          ))}
        </View>
      ));

    return rows;
  };

  const aiHandler = () => {
    router.replace(`/ai?text=${inputValue ? inputValue : ""}`);
  };

  // Loading state
  if (loading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#63784f" />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 bg-background">
      <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
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
            <Text className="mt-2 font-light text-secondary">
              Wykozystaj nasz system <Text className='font-bold capitalize'>sztucznej inteligencji</Text>, aby dowiedziec sie co nieco na temat ekologi
            </Text>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white mt-4 p-4 rounded-lg">
              <TextInput
                className="flex-1 ml-2 text-gray-700"
                placeholder="Zadaj pytanie ECO asystentowi"
                placeholderTextColor="#63784f"
                onChangeText={text => setInputValue(text)}
              />
              <Ionicons name="search-outline" size={24} color="black" onPress={aiHandler}/>
            </View>
          </ImageBackground>
        </View>

        {/* Popular Themes */}
        <View className="mt-8">
          <SectionText title='Popularne' containerStyles='px-8' />

          <ScrollView className="flex-row pl-8" horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={200} snapToAlignment={"start"} contentContainerClassName='pr-8'>
            {allTips.slice(0, 5).map((tip) => {
              return <ScrollCard key={`all-${tip.id}`} id={tip.id} imageName='logo-icon-new.png' title={tip.title} containerStyle='mr-4' />
            })}
          </ScrollView>
        </View>

        {/* Liked */}
        {!!likedTipsList.length && (
          <View className="mt-8">
            <SectionText title='Polubione' route='/all?allType=liked' containerStyles='px-8' />

            <ScrollView className="flex-row pl-8" horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={200} snapToAlignment={"start"} contentContainerClassName='pr-8'>
              {likedTipsList.slice(0, 5).map((tip) => {
                return <ScrollCard key={`liked-${tip.id}`} id={tip.id} imageName='logo-icon-new.png' title={tip.title} containerStyle='mr-4' />
              })}
            </ScrollView>
          </View>
        )}

        {/* Recycling Tips */}
        <View className="mt-8 px-8">
          <SectionText title='Porady' route='/all?allType=all' />

          <View className="bg-[#F2F2F2] w-full h-48 rounded-3xl flex items-center justify-center">
            <Image source={require('@/assets/images/zero-waste.png')} className='h-full w-full rounded-3xl' />
          </View>
          {displayTips(6)}
        </View>

      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
