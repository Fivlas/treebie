/* eslint-disable @typescript-eslint/no-require-imports */
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
//@ts-ignore
import ProgressBar from "react-native-progress/Bar";

type Level = 1 | 2 | 3 | "MAX";

const Tree = () => {
    const USER_EXP = 0;
    const USER_TEAM = "1";
    const [progress, setProgress] = useState<number>(0);
    const [level, setLevel] = useState<Level>(1);

    useEffect(() => {
        const calculateLvl = (): Level => {
            if (USER_EXP >= 570) {
                return "MAX";
            } else if (USER_EXP >= 270) {
                return 3;
            } else if (USER_EXP >= 90) {
                return 2;
            } else {
                return 1;
            }
        };

        // Set the level
        const newLevel = calculateLvl();
        setLevel(newLevel);

        let nextLevelExp = 0;
        if (newLevel === 3) {
            nextLevelExp = 570;
        } else if (newLevel === 2) {
            nextLevelExp = 270;
        } else if (newLevel === 1) {
            nextLevelExp = 90;
        }

        if (newLevel !== "MAX") {
            const progressToNextLevel = USER_EXP / nextLevelExp;
            setProgress(progressToNextLevel);
        } else {
            setProgress(1);
        }
    }, [USER_EXP]);

    const getImageSource = (): any => {
        switch (level) {
            case 1:
                return require(`@/assets/images/tree${USER_TEAM}-lvl1.png`);
            case 2:
                return require(`@/assets/images/tree${USER_TEAM}-lvl2.png`);
            case 3:
                return require(`@/assets/images/tree${USER_TEAM}-lvl3.png`);
            case "MAX":
                return require(`@/assets/images/tree${USER_TEAM}-lvl3.png`);
            default:
                return require(`@/assets/images/tree${USER_TEAM}-lvl1.png`);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            {/* Top Navigation Icons */}
            <View className="flex flex-row justify-between px-8 mt-2 items-center">
                <ThemedText className="text-4xl font-semibold mb-2">
                    Twoje drzewo
                </ThemedText>
                <TouchableOpacity
                    onPress={() => router.push("/shop?redirect=tree" as Href)}
                >
                    <Feather name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="px-8 mt-12 flex justify-between h-full">
                <Image
                    source={getImageSource()}
                    className="h-[510px] w-[300px] mx-auto"
                />
                <View className="absolute bottom-32 left-7">
                    <View className="flex-row items-center gap-2">
                        <ThemedText className="font-bold">
                            {level === "MAX" ? "" : "Poziom:"} {level}{" "}
                        </ThemedText>
                        <ProgressBar
                            progress={progress}
                            width={250}
                            height={20}
                            color="#606c38"
                            animating
                            borderWidth={2}
                            className="rounded-full"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default Tree;
