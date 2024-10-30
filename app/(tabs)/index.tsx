import ScrollCard from '@/components/HomePage/ScrollCard';
import SectionText from '@/components/HomePage/SectionText';
import React from 'react';
import { TextInput, ScrollView, Text, View, ImageBackground } from 'react-native';

const HomeScreen = () => {
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

            <ScrollCard id='1' imageName='logo-icon-new.png' title='Eco friendly' containerStyle='mr-4' />
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Przydatne rzeczy' containerStyle='mr-4' />
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Przydatne rzeczy' containerStyle='mr-4' />
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Przydatne rzeczy' containerStyle='mr-4' />

          </ScrollView>
        </View>

        {/* Recycling Tips */}
        <View className="mt-8 px-8">
          <SectionText title='Porady' route='/login' />

          <View className="bg-[#F2F2F2] w-full h-48 rounded-3xl flex items-center justify-center">
            <Text className="text-[#63784f] text-lg font-semibold">GO TO ZERO WASTE</Text>
          </View>

          <View className='flex-row justify-between mt-7'>
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Eco friendly' />
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Przydatne rzeczy' />
          </View>

          <View className='flex-row justify-between mt-7'>
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Eco friendly' />
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Przydatne rzeczy' />
          </View>

          <View className='flex-row justify-between mt-7'>
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Eco friendly' />
            <ScrollCard id='1' imageName='logo-icon-new.png' title='Przydatne rzeczy' />
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
