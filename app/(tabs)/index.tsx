import React from 'react';
import { TextInput, ScrollView, TouchableOpacity, Image, Text, View, SafeAreaView } from 'react-native';
// import { HomeIcon, SearchIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5] h-100vh">
      {/* Header Section */}
      <View className="bg-[#63784f] pt-10 pb-8 px-6 rounded-b-3xl">
        <Text className="text-2xl font-bold text-white">Save planet together</Text>
        <Text className="text-white mt-2">Separate garbage into mixed waste and recyclables at one touch</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white mt-6 p-2 rounded-lg">
          {/* <SearchIcon size={20} color="#63784f" /> */}
          <TextInput
            className="flex-1 ml-2 text-gray-700"
            placeholder="Search"
            placeholderTextColor="#63784f"
          />
        </View>
      </View>

      {/* Content Section */}
      <ScrollView>
        {/* Popular Themes */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4 px-6">
            <Text className="text-3xl font-medium text-gray-800">Popular themes</Text>
            <TouchableOpacity>
              <Text className="text-[#63784f]">See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-row pl-6" horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ marginRight: 16 }} className="bg-[#f2f] w-44 h-52 rounded-3xl justify-center items-center">
              <Image source={require('@/assets/images/logo-icon-new.png')} className="w-12 h-12" />
              <Text className="mt-2 text-text font-medium text-left">Eco friendly</Text>
            </View>

            <View style={{ marginRight: 16 }} className="bg-[#f2f] w-44 h-52 rounded-3xl justify-center items-center">
              <Image source={require('@/assets/images/logo-icon-new.png')} className="w-12 h-12" />
              <Text className="mt-2 text-text font-medium text-left">Useful items</Text>
            </View>

            <View className="bg-[#f2f] w-44 h-52 rounded-3xl justify-center items-center">
              <Image source={require('@/assets/images/logo-icon-new.png')} className="w-12 h-12" />
              <Text className="mt-2 text-text font-medium text-left">Useful items</Text>
            </View>
          </ScrollView>

        </View>

        {/* Recycling Tips */}
        <View className="mt-8 px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Recycling tips</Text>
            <TouchableOpacity>
              <Text className="text-[#63784f]">See all</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-[#F2F2F2] w-full h-24 rounded-lg flex items-center justify-center">
            <Text className="text-[#63784f] text-lg font-semibold">GO TO ZERO WASTE</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="flex-row justify-between items-center bg-white h-16 border-t border-gray-200 px-10">
        <TouchableOpacity>
          <HomeIcon size={24} color="#63784f" />
          <Text>Hom</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <SearchIcon size={24} color="gray" />
          <Text>sea</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('@/assets/images/logo-icon-new.png')} className="w-6 h-6" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('@/assets/images/logo-icon-new.png')} className="w-6 h-6" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
