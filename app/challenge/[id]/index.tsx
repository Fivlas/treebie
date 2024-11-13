import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "@/firebase.config";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField
} from "firebase/firestore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/elements/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/hooks/useUser";

const index = () => {
  type actionType = "start" | "ongoing" | "end" | "canceled" | null;
  type ActionDataType = {
    color: string;
    statusText: string;
    buttonText: string;
  } | null;
  type UserData = {
    currentQuest: string;
    email: string;
    items: object;
    likedTips: object;
    questsDone: Array<string>;
    team: string;
    treeProgress: number;
  };
  const [userInfo, setUserInfo] = useState<UserData>({
    currentQuest: "",
    email: "",
    items: {},
    likedTips: {},
    questsDone: [],
    team: "",
    treeProgress: 0,
  });

  const local = useLocalSearchParams();
  const { user, loading } = useUser();
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const questRef = doc(FIREBASE_DB, "quests", local.id?.toString() || "");
        const questRes = await getDoc(questRef);
        setChallenge(questRes.data());
        const userRef = doc(FIREBASE_DB, "users", user.uid);
        const userRes = await getDoc(userRef);
        if (userRes.exists()) {
          setUserInfo(userRes.data() as UserData);
        } else {
          console.log("user data not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, local.id]);
  const Convert = (): actionType => {
    if (!userInfo) return null;
    if (userInfo.currentQuest === local.id) {
      return "ongoing";
    } else if (userInfo.questsDone.includes(local.id.toString())) {
      return "end";
    } else if (
      !userInfo.questsDone.includes(local.id.toString()) ||
      !(userInfo.currentQuest === local.id)
    ) {
      return "start";
    } else {
      return null;
    }
  };
  const [challenge, setChallenge] = useState<object | any>();
  const [actualAction, setActualAction] = useState<actionType>(Convert());
  console.log(actualAction);
  // dodanie do currentQuest
  const addCurrentQuest = async (id: string) => {
    const userRef = doc(FIREBASE_DB, "users", id);
    await updateDoc(userRef, {
      currentQuest: local.id,
    });
  };
  //usuniecie z currentQuest
  
  // dodanie do tablicy
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
  // usuniecie z tablicy
  const removeDoneQuests = async (id: string) => {
    const docRef = doc(FIREBASE_DB, "users", id);
    try {
      await updateDoc(docRef, {
        questsDone: arrayRemove(id),
      });
    } catch (error) {
      console.error("Błąd podczas usuwania zadania:", error);
    }
  };
  const endQuest = async (id: string) => {
    const docRef = doc(FIREBASE_DB, "users", id);
    try {
      await updateDoc(docRef, {
        questsDone: arrayUnion(local.id),
      });
      await updateDoc(docRef, {
        currentQuest: "",
      });
    } catch (error) {
      console.error("Błąd podczas usuwania zadania:", error);
    }
  }
  
  // sprawdzic czy user niezaczal, zaczal, skonczyl zadanie
  // czy questsDone includes local.id
  const clickHandler = () => {
    if (!user) return;
    if (actualAction === "start") {
      addCurrentQuest(user.uid);
      setActualAction("ongoing");
    } else if (actualAction === "ongoing") {
      endQuest(user.uid);
      setActualAction("end");
    }
  };

  const getDataByAction = (): ActionDataType => {
    if (!user || !userInfo) return null;
    else if (Convert() === "start" || actualAction === "start") {
      return {
        color: "primary",
        statusText: "Dostępne",
        buttonText: "Rozpocznij",
      };
    } else if (Convert() === "ongoing" || actualAction === "ongoing") {
      return {
        color: "orange",
        statusText: "W trakcie",
        buttonText: "Zakończ",
      };
    } else if (Convert() === "end"  || actualAction === "end") {
      return {
        color: "red",
        statusText: "Zakończone",
        buttonText: "Zakończono",
      };
    } else if (Convert() === "canceled"  || actualAction === "canceled") {
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
  if (!userInfo) {
    return (
      <SafeAreaView className="flex items-center justify-center h-full">
        <Text className="text-3xl">Loading...</Text>
      </SafeAreaView>
    ); // lub inne informacje o ładowaniu danych
  } else {
    return (
      <SafeAreaView>
        <View className="p-4 h-full">
          <View className="p-2 rounded-lg bg-background flex flex-column justify-between h-full">
            <View className="flex flex-column gap-4">
              <View className="flex flex-row items-center gap-2">
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/challenges")}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={36}
                    color="black"
                  />
                </TouchableOpacity>
                <Text className="text-4xl font-bold">{challenge?.title}</Text>
              </View>
              <Text className="text-gray-400 text-xl">
                {challenge?.description}
              </Text>
              <Text
                className={`text-3xl text-${
                  getDataByAction()?.color
                } font-bold`}
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
              //@ts-ignore
              title={
                getDataByAction()
                  ? getDataByAction()?.buttonText.toString()
                  : ""
              }
              buttonType="primary"
              textStyles="text-3xl"
              handlePress={clickHandler}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
export default index;
