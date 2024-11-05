import { SafeAreaView, Text, View } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
import { useState } from "react";
interface ParentProps {}
const Challenges: React.FC<ParentProps> = ()  => {
  
  const [query, setQuery] = useState<string>("");
  const getQuery = (q: string) => {
    setQuery(q);
  }
  console.log(query)
  return (
    <SafeAreaView>
      <View className="p-4">
        <Text
          className="text-primary'
         text-4xl font-bold mb-2"
        >
          Wyzwania
        </Text>
        <SearchBar getData={getQuery}/>
        <ChallengesList queryToFilter={query}/>
      </View>
    </SafeAreaView>
  );
}
export default Challenges;
