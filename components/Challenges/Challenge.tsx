import { View, Text, TouchableOpacity } from "react-native";
import { ChallengeType } from "./ChallengesList";
import { Href, router } from "expo-router";
export const Challenge = ({id, title, description, difficultyLevel, pointsToGain, challengeGroup, difficultyName} : ChallengeType) => {
  // const challenge = props;
  
  const fixedDifficultyName = difficultyName[0].toUpperCase() + difficultyName.slice(1, 10000);
  const getColor = () => {
    const difficulty = difficultyLevel;
    if(difficulty === 1) return "primary";
    else if(difficulty === 2) return "orange";
    else if(difficulty === 3) return "red";
    else return "error with colors";
  }
  return (
    <TouchableOpacity onPress={() => router.push(`/challenge/${id}` as Href)} className="my-2 rounded-3xl bg-[#f2f3ef] flex flex-row overflow-hidden">
      
      <View className="w-2/3 p-6">
      <Text className="text-2xl font-bold">{title}</Text>
      <Text className="text-base">{description}</Text>
      <Text className="text-slate-700 mt-4">#{challengeGroup} #eko</Text>
      </View>
      <View className={`w-1/3 flex justify-center items-center bg-${getColor()}`}>
        <Text className="text-secondary text-6xl">{pointsToGain}</Text>
        <Text className="text-secondary text-2xl">punktów</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Challenge;
