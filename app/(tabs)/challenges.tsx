import { SafeAreaView, Text, View } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
import { useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
interface ParentProps {}
const Challenges: React.FC<ParentProps> = () => {
  const [query, setQuery] = useState<string>("");
  const getQuery = (q: string) => {
    setQuery(q);
  };
  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex flex-row items-center justify-between ">
          <Text
            className="text-primary'
         text-4xl font-bold mb-2"
          >
            Wyzwania
          </Text>
          <Text>
          <FontAwesome6 name="coins" size={24} color="black" />
          </Text>
        </View>
        <SearchBar getData={getQuery} />
        <ChallengesList queryToFilter={query} />
      </View>
    </SafeAreaView>
  );
};
export default Challenges;
