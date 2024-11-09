import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
import { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
interface ParentProps {}
const Challenges: React.FC<ParentProps> = () => {
  const [query, setQuery] = useState<string>("");
  const getQuery = (q: string) => {
    setQuery(q);
  };
  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex flex-row items-center justify-between px-1">
          <Text
            className="text-primary'
         text-4xl font-bold mb-2"
          >
            Wyzwania
          </Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/shop")}>
            <FontAwesome6 name="coins" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <SearchBar getData={getQuery} />
        <ChallengesList queryToFilter={query} />
      </View>
    </SafeAreaView>
  );
};
export default Challenges;
