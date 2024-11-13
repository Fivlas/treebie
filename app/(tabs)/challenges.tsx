import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@/hooks/useUser";
import { FIREBASE_DB } from "@/firebase.config";
import Challenge from "@/components/Challenges/Challenge";
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
  const [currentQuest, setCurrentQuest] = useState<Quest>();
  const [query, setQuery] = useState<string>("");
  const getQuery = (q: string) => {
    setQuery(q);
  };
  const backgroundColor = useThemeColor({ light: "", dark: "" }, "background");
  const textColor = useThemeColor({ light: "", dark: "" }, "text");

  const closeApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
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
        console.log("Error checking or setting the alert flag:", error);
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
    // const getCurrentQuestId = async () => {
    //   try {
    //     const currentQuestIdRef = doc(FIREBASE_DB, "users", user.uid);
    //     const questDoc = await getDoc(currentQuestIdRef);

    //     if (questDoc.exists()) {
    //       const userData = questDoc.data();
    //       setCurrentQuestId(userData?.currentQuest || null);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    const fetchCurrentQuest = async () => {
      try {
        // Krok 1: Pobierz currentQuest z kolekcji users
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentQuestId(userData?.currentQuest);

          if (currentQuestId) {
            // Krok 2: Użyj currentQuest do pobrania odpowiedniego dokumentu w quests
            const questDocRef = doc(FIREBASE_DB, "quests", currentQuestId);
            const questDoc = await getDoc(questDocRef);

            if (questDoc.exists()) {
              setCurrentQuest(questDoc.data() as Quest);
            } else {
              console.log("Dokument quest nie istnieje.");
            }
          } else {
            console.log("Brak currentQuest w dokumencie użytkownika.");
          }
        } else {
          console.log("Dokument użytkownika nie istnieje.");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    checkFirstUse();
    fetchCurrentQuest();
  }, [user, loading, currentQuestId]);
  const getColor = (level: number) => {
    if (level === 1) return { text: "text-primary", bg: "bg-primary" };
    if (level === 2) return { text: "text-orange", bg: "bg-orange" };
    if (level === 3) return { text: "text-red", bg: "bg-red" };
    else console.log("Color error");
  };

  return (
    <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
      <View className="flex flex-row items-center justify-between px-8 mt-2">
        <ThemedText className="text-4xl font-semibold mb-2">
          Wyzwania
        </ThemedText>
      </View>
      <SearchBar getData={getQuery} />
      {currentQuestId ? (
        <View className="px-4">
          <Text className="text-2xl">Aktywne zadanie</Text>
          {currentQuest && (
            <Challenge
              id={currentQuestId}
              title={currentQuest.title}
              difficultyLevel={currentQuest.difficultyLevel}
              color={getColor(currentQuest.difficultyLevel)}
              asActive={true}
            />
          )}
        </View>
      ) : (
        null 
      )}
      <ChallengesList queryToFilter={query} />
    </SafeAreaView>
  );
};

export default Challenges;
