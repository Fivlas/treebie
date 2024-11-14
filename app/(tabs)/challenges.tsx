import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@/hooks/useUser";
import { FIREBASE_DB } from "@/functions/firebaseConfig";
import Challenge from "@/components/Challenges/Challenge";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface ParentProps {}
type Quest = {
  challengeGroup: string;
  description: string;
  difficultyLevel: number;
  difficultyName: string;
  pointsToGain: number;
  title: string;
};

const Challenges: React.FC<ParentProps> = () => {
  const { user, loading } = useUser();
  const [currentQuestId, setCurrentQuestId] = useState<string | undefined>("");
  const [currentQuest, setCurrentQuest] = useState<Quest | undefined>();
  const [query, setQuery] = useState<string>("");
  const [isQuestLoading, setIsQuestLoading] = useState<boolean>(true);

  const backgroundColor = useThemeColor({ light: "", dark: "" }, "background");

  const closeApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
  };

  const getQuery = (q: string) => {
    setQuery(q);
  };

  useEffect(() => {
    if (!user || loading) return;

    const checkFirstUse = async () => {
      try {
        const hasSeenAlert = await AsyncStorage.getItem("hasSeenAlert");
        if (!hasSeenAlert) {
          askAlert();
        }
      } catch (error) {
        console.log("Error checking alert flag:", error);
      }
    };

    const askAlert = () => {
      Alert.alert(
        "Uwaga",
        "Czy zobowiązujesz się do rzetelnego wypełniania wyzwań?",
        [
          {
            text: "Nie",
            onPress: () => closeAppAlert(),
            style: "destructive",
          },
          {
            text: "Tak",
            onPress: () => AsyncStorage.setItem("hasSeenAlert", "true"),
          },
        ]
      );
    };

    const closeAppAlert = () => {
      Alert.alert(
        "Kondolencje",
        "Bardzo nam przykro, że nie potrafisz być uczciwy. Przemyśl swój wybór",
        [
          {
            text: "Zamknij",
            onPress: () => closeApp(),
            style: "destructive",
          },
        ]
      );
    };

    checkFirstUse();
  }, [user, loading]);

  // Fetch the current quest from Firestore
  const fetchCurrentQuest = async () => {
    setIsQuestLoading(true);
    try {
      if (!user) return;
      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.warn("User document does not exist.");
        setCurrentQuest(undefined);
        setIsQuestLoading(false);
        return;
      }

      const userData = userDoc.data();
      const questId = userData?.currentQuest;
      if (!questId) {
        console.log("No current quest found for this user.");
        setCurrentQuest(undefined);
        setIsQuestLoading(false);
        return;
      }

      const questDocRef = doc(FIREBASE_DB, "quests", questId);
      const questDoc = await getDoc(questDocRef);

      if (questDoc.exists()) {
        const questData = questDoc.data() as Quest;
        setCurrentQuest(questData);
        setCurrentQuestId(questId);
      } else {
        console.error("Quest document does not exist.");
        setCurrentQuest(undefined);
      }
    } catch (error) {
      console.error("Error fetching current quest:", error);
      setCurrentQuest(undefined);
    } finally {
      setIsQuestLoading(false);
    }
  };

  // Refetch current quest on screen focus
  useFocusEffect(
    useCallback(() => {
      if (user && !loading) {
        fetchCurrentQuest();
      }
    }, [user, loading])
  );

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return { text: "text-primary", bg: "bg-primary" };
      case 2:
        return { text: "text-orange", bg: "bg-orange" };
      case 3:
        return { text: "text-red", bg: "bg-red" };
      default:
        console.log("Invalid difficulty level");
        return { text: "text-gray", bg: "bg-gray" };
    }
  };

  return (
    <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
      <View className="flex flex-row items-center justify-between px-8 mt-2">
        <ThemedText className="text-4xl font-semibold mb-2">
          Wyzwania
        </ThemedText>
      </View>

      <SearchBar getData={getQuery} />

      {/* Display loading indicator or current quest */}
      {isQuestLoading ? (
        <ActivityIndicator size="large" color="#798156" />
      ) : currentQuest && (
        <View className="px-4">
          <ThemedText className="text-2xl font-semibold">Aktywne zadanie</ThemedText>
          <Challenge
            id={currentQuestId!}
            title={currentQuest.title}
            difficultyLevel={currentQuest.difficultyLevel}
            color={getColor(currentQuest.difficultyLevel)}
            asActive={true}
          />
        </View>
      )}

      <ChallengesList queryToFilter={query} />
    </SafeAreaView>
  );
};

export default Challenges;