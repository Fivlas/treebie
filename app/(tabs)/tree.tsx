/* eslint-disable @typescript-eslint/no-require-imports */
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FIREBASE_DB } from "@/functions/firebaseConfig";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUser } from "@/hooks/useUser";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
//@ts-ignore
import ProgressBar from "react-native-progress/Bar";

type Level = 1 | 2 | 3 | "MAX";

const Tree = () => {
    const { user, loading } = useUser();

    const [userExp, setUserExp] = useState<number>(0);
    const [userTeam, setUserTeam] = useState<string>("1");
    const [progress, setProgress] = useState<number>(0);
    const [level, setLevel] = useState<Level>(1);
    const backgroundColor = useThemeColor({ light: "", dark: ""}, 'background');
    
        useEffect(() => {
            const getData = async () => {
                if (loading) return;
                if (!user) {
                    console.error("User is not logged in");
                    return;
                }

                try {
                    const docRef = doc(FIREBASE_DB, "users", user.uid);
                    const res = await getDoc(docRef);
                    const data = res.data();

                    if (data) {
                        setUserExp(data.treeProgress || 0);
                        setUserTeam(data.team || "1");
                    }
                } catch (error) {
                    console.error("Error fetching document: ", error);
                }
            };

            getData();
        }, [user, loading])

    useEffect(() => {
        const calculateLvl = (): Level => {
            if (userExp >= 570) return "MAX";
            if (userExp >= 270) return 3;
            if (userExp >= 90) return 2;
            return 1;
        };

        const newLevel = calculateLvl();
        setLevel(newLevel);

        const nextLevelExp = newLevel === 3 ? 570 : newLevel === 2 ? 270 : 90;
        setProgress(newLevel === "MAX" ? 1 : userExp / nextLevelExp);
    }, [userExp]);


    const getImageSource = (): any => {
        const images: Record<string, any> = {
            "1-lvl1": require("@/assets/images/tree1-lvl1.png"),
            "1-lvl2": require("@/assets/images/tree1-lvl2.png"),
            "1-lvl3": require("@/assets/images/tree1-lvl3.png"),
            "2-lvl1": require("@/assets/images/tree2-lvl1.png"),
            "2-lvl2": require("@/assets/images/tree2-lvl2.png"),
            "2-lvl3": require("@/assets/images/tree2-lvl3.png"),
        };

        const key = `${userTeam}-lvl${level === "MAX" ? 3 : level}`;
        return images[key] || images["1-lvl1"];
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#606c38" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
            {/* Top Navigation Icons */}
            <View className="flex flex-row items-center justify-between px-8 mt-2">
                <ThemedText className="text-4xl font-semibold mb-2">
                    Twoje drzewo
                </ThemedText>
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
