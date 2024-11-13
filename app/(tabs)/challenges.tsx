import { Alert, BackHandler, Platform, SafeAreaView, View } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ParentProps {}
const Challenges: React.FC<ParentProps> = () => {
  const [query, setQuery] = useState<string>("");
  const getQuery = (q: string) => {
    setQuery(q);
  };
  const backgroundColor = useThemeColor({ light: "", dark: ""}, 'background');
  const textColor = useThemeColor({ light: "", dark: ""}, 'text');

  const closeApp = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    }
  };

  useEffect(() => {
    const checkFirstUse = async () => {
      try {
        const hasSeenAlert = await AsyncStorage.getItem('hasSeenAlert');
        
        if (!hasSeenAlert) {
          askAlert();
        }
      } catch (error) {
        console.log("Error checking or setting the alert flag:", error);
      }
    };

    const askAlert = () => {
      Alert.alert('Uwaga', 'Czy zobowiązujesz się do rzetelnego wypełniania wyzwań?', [
        {
          text: 'Nie',
          onPress: () => closeAppAlert(),
          style: 'destructive',
        },
        { text: 'Tak', onPress: () => AsyncStorage.setItem('hasSeenAlert', 'true') },
      ]);
    };

    const closeAppAlert = () => {
      Alert.alert('Kondolencje', 'Bardzo nam przykro, że nie potrafisz być uczciwy. Przemyśl swój wybór', [
        {
          text: 'Zamknij',
          onPress: () => closeApp(),
          style: 'destructive',
        },
      ]);
    };

    checkFirstUse(); 

  }, []);

  return (
    <SafeAreaView className="flex-1" style={[{ backgroundColor }]}>
      <View className="flex flex-row items-center justify-between px-8 mt-2">
        <ThemedText className="text-4xl font-semibold mb-2">
          Wyzwania
        </ThemedText>
      </View>
      <SearchBar getData={getQuery} />
      <ChallengesList queryToFilter={query} />
    </SafeAreaView>
  );
};

export default Challenges;
