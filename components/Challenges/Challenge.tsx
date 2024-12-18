import { View, Text, TouchableOpacity } from "react-native";
import { ChallengeType } from "./ChallengesList";
import { Href, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";
import { ThemedText } from "../ThemedText";
export const Challenge = ({
  id,
  title,
  description,
  difficultyLevel,
  pointsToGain,
  challengeGroup,
  asActive,
}: ChallengeType) => {
  const colorScheme = useColorScheme();
  const getColor = () => {
    const difficulty = difficultyLevel;
    if (difficulty === 1) return "primary";
    else if (difficulty === 2) return "orange";
    else if (difficulty === 3) return "red";
    else return "error with colors";
  };
  return asActive ? (
    <TouchableOpacity
      onPress={() => router.push(`/challenge/${id}` as Href)}
      className={`my-2 rounded-3xl ${
        colorScheme === "light" ? "bg-lightBg" : "bg-darkBg"
      } flex flex-row overflow-hidden`}
    >
      <View className="w-2/3 p-4">
        <ThemedText className="text-2xl font-semibold">{title}</ThemedText>
      </View>
      <View
        className={`w-1/3 flex justify-center items-center p-4 bg-${getColor()}`}
      >
        <Ionicons name="arrow-forward" size={24} color="#fefae0" />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => router.push(`/challenge/${id}` as Href)}
      className={`my-2 rounded-3xl ${
        colorScheme === "light" ? "bg-lightBg" : "bg-darkBg"
      } flex flex-row overflow-hidden`}
    >
      {colorScheme === "light" ? (
        <View className="w-2/3 p-6">
          <Text className="text-2xl font-semibold">{title}</Text>
          <Text className="text-base">{description}</Text>
          <Text className="text-slate-700 mt-4">#{challengeGroup} #eko</Text>
        </View>
      ) : (
        <View className="w-2/3 p-6">
          <Text className="text-2xl font-semibold text-lightBg">{title}</Text>
          <Text className="text-base text-lightBg">{description}</Text>
          <Text className="text-gray-500 mt-4">#{challengeGroup} #eko</Text>
        </View>
      )}
      <View
        className={`w-1/3 flex justify-center items-center bg-${getColor()}`}
      >
        <Text className="text-secondary text-6xl">{pointsToGain}</Text>
        <Text className="text-secondary text-2xl">punktów</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Challenge;
