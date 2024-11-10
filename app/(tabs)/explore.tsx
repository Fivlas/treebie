import { View, Text, SafeAreaView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/elements/CustomButton";
import { StyleSheet } from "react-native";

const index = () => {
    const [challenge, setChallenge] = useState<object | any>();
    const local = useLocalSearchParams();
    const [tempData, setTempData] = useState<[string, string, string]>([
        "#606c38",
        "#cc7a00",
        "#a23b3b",
    ]);
    type actionType = "start" | "ongoing" | "end" | any;
    const [actualAction, setActualAction] = useState<actionType>("start");
    // const actionData = [
    //   {
    //     name: "start",
    //     color: tempData[0],
    //   },
    //   {
    //     name: "ongoing",
    //     color: tempData[1],
    //   },
    //   {
    //     name: "end",
    //     color: tempData[2],
    //   },
    // ];
    // useEffect(() => {
    //   const getData = async (id: string) => {
    //     try {
    //       const docRef = doc(FIREBASE_DB, "quests", id);
    //       const res = await getDoc(docRef);
    //       setChallenge(res.data());
    //     } catch (error) {
    //       console.error("Error fetching document: ", error);
    //     }
    //   };
    //   getData(local.id.toString());
    // }, []);
    type ActionDataType = {
        color: string;
        statusText: string;
        buttonText: string;
    }
    console.log(actualAction);
    const getDataByAction = (): ActionDataType => {
        if (actualAction === "start") {
            return {
                color: "primary",
                statusText: "Dostępne",
                buttonText: "Rozpocznij",
            };
        } else if (actualAction === "ongoing") {
            return {
                color: "orange",
                statusText: "W trakcie",
                buttonText: "Zakończ",
            };
        } else if (actualAction === "end") {
            return {
                color: "red",
                statusText: "Zakończone",
                buttonText: "Zakończono",
            };
        }
        return {
            color: "red",
            statusText: "Error",
            buttonText: "Error",
        };
    };
    return (
        <SafeAreaView>
            <View className="p-4 h-full">
                <View className="p-2 rounded-lg bg-background flex flex-column justify-between h-full">
                    <View className="flex flex-column gap-4">
                        <Text className="text-4xl font-bold">
                            {challenge?.title}Posadź drzewka
                        </Text>
                        <Text className="text-gray-400 text-xl">
                            Kup sadzonkę drzewa i posadź ją w swojej okolicy, aby pomóc
                            środowisku.
                        </Text>
                        <Text
                            className={`text-3xl text-${getDataByAction()?.color} font-bold`}
                        >
                            {getDataByAction()?.statusText}
                        </Text>
                    </View>

                    <View className="w-full flex items-center">
                        <View
                            className={`w-[300px] h-[300px] rounded-full bg-${getDataByAction()?.color
                                } flex justify-center items-center`}
                        >
                            <View className="w-[240px] h-[240px] rounded-full bg-white flex justify-center items-center">
                                <Text
                                    className={`text-[50px] text-${getDataByAction()?.color}`}
                                >
                                    50 pkt
                                </Text>
                            </View>
                        </View>
                    </View>
                    <CustomButton
                        title={getDataByAction()?.buttonText.toString()}
                        buttonType="primary"
                        textStyles="text-3xl"
                        handlePress={() => {
                            setActualAction(
                                actualAction === "start"
                                    ? "ongoing"
                                    : actualAction === "ongoing"
                                        ? "end"
                                        : actualAction
                            );
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default index;