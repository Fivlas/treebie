import { SafeAreaView, Text, View } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
export default function Challenges() {
  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="text-4xl font-bold mb-2">Wyzwania</Text>
        <SearchBar />
        <ChallengesList />
      </View>
    </SafeAreaView>
  );
}
