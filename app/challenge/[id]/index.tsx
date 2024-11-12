import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "@/firebase.config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/elements/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/hooks/useUser";

const index = () => {
  type actionType = "start" | "ongoing" | "end" | "canceled";
  type ActionDataType = {
    color: string;
    statusText: string;
    buttonText: string;
  };
  const [challenge, setChallenge] = useState<object | any>();
  const local = useLocalSearchParams();
  const [actualAction, setActualAction] = useState<actionType>("start");
  const { user, loading } = useUser();
  useEffect(() => {
    const getData = async (id: string) => {
      try {
        const docRef = doc(FIREBASE_DB, "quests", id);
        const res = await getDoc(docRef);
        setChallenge(res.data());
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    getData(local.id.toString());
  }, []);
  const setCurrentQuest = async (id: string) => {
    const userRef = doc(FIREBASE_DB, "users", id);
    await updateDoc(userRef, {
      currentQuest: local.id,
    });
  };
  const addDoneQuests = async (id: string) => {
    try {
      const userRef = doc(FIREBASE_DB, "users", id);
      await updateDoc(userRef, {
        questsDone: arrayUnion(local.id),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getQuestDataByUser = async () => {
    
  }
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
    } else if (actualAction === "canceled") {
      return {
        color: "red",
        statusText: "Anulowane",
        buttonText: "Anulowano",
      };
    }
    return {
      color: "red",
      statusText: "Error",
      buttonText: "Error",
    };
  };
  const clickHandler = () => {
    if (actualAction === "start") {
      setCurrentQuest(user.uid);
      setActualAction("ongoing")
    } else if (actualAction === "ongoing") {
      addDoneQuests(user.uid)
      setActualAction("end")
    }
  };
  return (
    <SafeAreaView>
      <View className="p-4 h-full">
        <View className="p-2 rounded-lg bg-background flex flex-column justify-between h-full">
          <View className="flex flex-column gap-4">
            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/challenges")}
              >
                <Ionicons name="chevron-back-outline" size={36} color="black" />
              </TouchableOpacity>
              <Text className="text-4xl font-bold">{challenge?.title}</Text>
            </View>
            <Text className="text-gray-400 text-xl">
              {challenge?.description}
            </Text>
            <Text
              className={`text-3xl text-${getDataByAction()?.color} font-bold`}
            >
              {getDataByAction()?.statusText}
            </Text>
          </View>

          <View className="w-full flex items-center">
            <View
              className={`w-[300px] h-[300px] rounded-full bg-${
                getDataByAction()?.color
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
            handlePress={clickHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default index;
