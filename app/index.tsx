import CustomButton from '@/components/elements/CustomButton';
import { useUser } from '@/hooks/useUser';
import { Href, Redirect, router } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, View, Text } from 'react-native';

const Index = () => {
    const { user } = useUser();
    if (user) return <Redirect href={'/(tabs)/' as Href} />;

    return (
        <View className="flex-1">
            <ImageBackground
                source={require('@/assets/images/banner-image.png')}
                className="flex-1 justify-center items-center bg-[#63784f]"
            >
                {/* Logo and Title */}
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require('@/assets/images/logo-icon-new.png')}
                        className="h-52 w-52"
                    />
                    <Text className="font-bold text-8xl text-secondary text-center mt-8">
                        Treebie
                    </Text>
                </View>
                
                <CustomButton
                    title="Dołącz"
                    buttonType="secondary"
                    handlePress={() => router.replace("/(auth)/login")}
                    containerStyles="absolute bottom-8 w-[80%]"
                />
            </ImageBackground>
        </View>
    );
};

export default Index;
