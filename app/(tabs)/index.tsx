import ScrollCard from '@/components/HomePage/ScrollCard';
import SectionText from '@/components/HomePage/SectionText';
import React, { useEffect, useState } from 'react';
import { TextInput, ScrollView, Text, View, ImageBackground } from 'react-native';
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { FIREBASE_DB } from '@/firebase.config';
import { shuffleArray } from '@/functions/shuffleArray';

const HomeScreen = () => {
  const [tips, setTips] = useState<TipFields[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const tipsCollectionRef = collection(FIREBASE_DB, "tips");
        const tipsQuery = query(tipsCollectionRef, orderBy('popularity', 'desc'));
        const querySnapshot = await getDocs(tipsQuery);

        const everyTip: TipFields[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as TipData
        }));
        
        setTips(everyTip);
      }
      catch (e) {
        console.log("Error fetching tips data from Firestore: ", e)
      }
    }
    fetchTips();
  }, [])

  function displayTips(hm: number = 20): JSX.Element[] {
    const rows = shuffleArray(tips)
      .splice(0, hm)
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
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={{ overflow: 'hidden', borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
          <ImageBackground
            source={require('@/assets/images/banner-image.png')}
            className="bg-[#63784f] pt-[85px] pb-14 px-8 flex gap-2"
            style={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
          >
            <Text className="text-3xl tracking-widest font-bold text-secondary">
              Save planet together
            </Text>
            <Text className="mt-2 font-light text-secondary">
              Separate garbage into mixed waste and{"\n"}recyclables at one touch
            </Text>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white mt-6 p-4 rounded-lg">
              <TextInput
                className="flex-1 ml-2 text-gray-700"
                placeholder="Search"
                placeholderTextColor="#63784f"
              />
            </View>
          </ImageBackground>
        </View>

        {/* Popular Themes */}
        <View className="mt-8">
          <SectionText title='Popularne' route='/login' containerStyles='px-8' />

          <ScrollView className="flex-row pl-8" horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
            {tips.slice(0, 5).map((tip) => {
              return <ScrollCard key={tip.id} id={tip.id} imageName='logo-icon-new.png' title={tip.title} containerStyle='mr-4' />
            })}
          </ScrollView>
        </View>

        {/* Recycling Tips */}
        <View className="mt-8 px-8">
          <SectionText title='Porady' route='/login' />

          <View className="bg-[#F2F2F2] w-full h-48 rounded-3xl flex items-center justify-center">
            <Text className="text-[#63784f] text-lg font-semibold">GO TO ZERO WASTE</Text>
          </View>
          {/* tutaj mozna wpisac liczbe porad ktore są wyswietlane np displayTips(6) */}
          {displayTips(6)}
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
