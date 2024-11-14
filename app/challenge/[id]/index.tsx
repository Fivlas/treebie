import { View, Text, SafeAreaView, TouchableOpacity, Platform, Alert } from "react-native";
import { Href, router, useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "@/firebase.config";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/elements/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/hooks/useUser";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

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

const index = () => {
  const local = useLocalSearchParams();
  const { user, loading } = useUser();
  const [challenge, setChallenge] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [actualAction, setActualAction] = useState<actionType>(null);
  const backgroundColor = useThemeColor(
    { light: "", dark: "" },
    "background"
  );

  const determineAction = (userInfo: UserData | null): actionType => {
    if (!userInfo || !local.id) return null;
    const questId = local.id.toString();

    const questsDone = Array.isArray(userInfo.questsDone) ? userInfo.questsDone : [];

    if (!questsDone) return null;

    if (userInfo.currentQuest === questId) return "ongoing";
    if (questsDone.includes(questId)) return "end";
    return "start";
};

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      try {
        const questId = local.id?.toString() || "";
        const questRef = doc(FIREBASE_DB, "quests", questId);
        const userRef = doc(FIREBASE_DB, "users", user.uid);

        const [questRes, userRes] = await Promise.all([getDoc(questRef), getDoc(userRef)]);

        if (questRes.exists()) {
          setChallenge(questRes.data());
        }

        if (userRes.exists()) {
          const userData = userRes.data() as UserData;
          setUserInfo(userData);
          setActualAction(determineAction(userData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData();
  }, [user, local.id, loading]);

  const addCurrentQuest = async () => {
    if (!user || !local.id) return;
    const questId = local.id.toString();
    const questRef = doc(FIREBASE_DB, "quests", questId);
  
    try {
      const questDoc = await getDoc(questRef);
      if (!questDoc.exists()) {
        console.error(`Quest with ID ${questId} does not exist.`);
        return;
      }
  
      if (userInfo?.currentQuest) {
        Alert.alert(
          "Nadpisz aktualne wyzwanie",
          "Aktualnie jesteś wtrakcie innego wyzwania. Czy chcesz je nadpisac?",
          [
            {
              text: "Anuluj",
              style: "cancel",
            },
            {
              text: "Nadpisz",
              onPress: async () => {
                const userRef = doc(FIREBASE_DB, "users", user.uid);
                await updateDoc(userRef, { currentQuest: questId });
                setActualAction("ongoing");
              },
            },
          ]
        );
      } else {
        const userRef = doc(FIREBASE_DB, "users", user.uid);
        await updateDoc(userRef, { currentQuest: questId });
        setActualAction("ongoing");
      }
    } catch (error) {
      console.error("Error adding current quest:", error);
    }
  };

  const endQuest = async () => {
    if (!user || !local.id) return;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    await updateDoc(userRef, {
      questsDone: arrayUnion(local.id),
      currentQuest: "",
      treeProgress: increment(challenge.pointsToGain)
    });
    setActualAction("end");
  };

  const clickHandler = () => {
    if (actualAction === "start") {
      addCurrentQuest();
    } else if (actualAction === "ongoing") {
      endQuest();
    }
  };

  const getDataByAction = (): ActionDataType => {
    switch (actualAction) {
      case "start":
        return { color: "primary", statusText: "Dostępne", buttonText: "Rozpocznij" };
      case "ongoing":
        return { color: "orange", statusText: "W trakcie", buttonText: "Zakończ" };
      case "end":
        return { color: "red", statusText: "Zakończone", buttonText: "Zakończono" };
      case "canceled":
        return { color: "red", statusText: "Anulowane", buttonText: "Anulowano" };
      default:
        return { color: "red", statusText: "Error", buttonText: "Error" };
    }
  };

  if (!userInfo || !challenge) {
    return (
      <SafeAreaView className="flex items-center justify-center h-full">
        <Text className="text-3xl">Loading...</Text>
      </SafeAreaView>
    );
  }

  const actionData = getDataByAction();

  return (
    <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
      <View className="h-full px-8">
        <View className="rounded-lg flex flex-column h-full">
          <View className="flex flex-column gap-4">

            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                className="p-3 rounded-lg bg-[#798156] mr-3"
                onPress={() => router.replace("/(tabs)/challenges" as Href)}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={18}
                  color="white"
                />
              </TouchableOpacity>
              <ThemedText className="text-4xl font-semibold">
                {challenge?.title}
              </ThemedText>
            </View>


            <Text className="text-gray-400 text-xl">{challenge?.description}</Text>
            <Text className={`text-3xl text-${actionData?.color} font-bold`}>
              {actionData?.statusText}
            </Text>
          </View>

          <View className="justify-center items-center mt-16">
            <View className={`w-[300px] h-[300px] rounded-full bg-${actionData?.color} flex justify-center items-center`}>
              <View
                className="w-[240px] h-[240px] rounded-full flex justify-center items-center"
                style={[{ backgroundColor }]}
              >
                <Text className={`text-[50px] text-${actionData?.color}`}>{challenge.pointsToGain} pkt</Text>
              </View>
            </View>
          </View>

          <CustomButton
            title={actionData?.buttonText || ""}
            containerStyles={`w-[80%] absolute ${Platform.OS === 'android' ? "bottom-3" : "bottom-7"} self-center`}
            buttonType="primary"
            textStyles="text-3xl font-semibold"
            handlePress={clickHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
