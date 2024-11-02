import { View, Text } from "react-native";
import { ChallengeType } from "./ChallengesList";
export const Challenge = (challenge: ChallengeType) => {
  return <View className="border rounded-lg p-2">
  <Text className="text-xl font-bold">{}</Text>
  <Text></Text>
</View>;
};
export default Challenge;
