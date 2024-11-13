import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "@/firebase.config";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/elements/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/hooks/useUser";

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

  // Function to determine the current action
  const determineAction = (userInfo: UserData | null): actionType => {
    if (!userInfo || !local.id) return null;
    const questId = local.id.toString();
  
    const questsDone = Array.isArray(userInfo.questsDone) ? userInfo.questsDone : [];
  
    if (userInfo.currentQuest === questId) return "ongoing";
    if (questsDone.includes(questId)) return "end";
    return "start";
  };

  // Fetch data and update userInfo and challenge
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
          setActualAction(determineAction(userData)); // Update actualAction based on fetched userInfo
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, local.id, loading]);

  // Handlers for quest actions
  const addCurrentQuest = async () => {
    if (!user || !local.id) return;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    await updateDoc(userRef, { currentQuest: local.id });
    setActualAction("ongoing");
  };

  const endQuest = async () => {
    if (!user || !local.id) return;
    const userRef = doc(FIREBASE_DB, "users", user.uid);
    await updateDoc(userRef, {
      questsDone: arrayUnion(local.id),
      currentQuest: "",
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

  // Get button data based on current action
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
    <SafeAreaView>
      <View className="p-4 h-full">
        <View className="p-2 rounded-lg bg-background flex flex-column justify-between h-full">
          <View className="flex flex-column gap-4">
            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity onPress={() => router.push("/(tabs)/challenges")}>
                <Ionicons name="chevron-back-outline" size={36} color="black" />
              </TouchableOpacity>
              <Text className="text-4xl font-bold">{challenge?.title}</Text>
            </View>
            <Text className="text-gray-400 text-xl">{challenge?.description}</Text>
            <Text className={`text-3xl text-${actionData?.color} font-bold`}>
              {actionData?.statusText}
            </Text>
          </View>

          <View className="w-full flex items-center">
            <View className={`w-[300px] h-[300px] rounded-full bg-${actionData?.color} flex justify-center items-center`}>
              <View className="w-[240px] h-[240px] rounded-full bg-white flex justify-center items-center">
                <Text className={`text-[50px] text-${actionData?.color}`}>50 pkt</Text>
              </View>
            </View>
          </View>

          <CustomButton
            title={actionData?.buttonText || ""}
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
