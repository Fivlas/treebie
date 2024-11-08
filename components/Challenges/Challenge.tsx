import React from 'react'
import { View, Text, TouchableOpacity } from "react-native";
import { ChallengeType } from "./ChallengesList";
export const Challenge = ({ title, description, difficultyLevel, pointsToGain, challengeGroup, difficultyName }: ChallengeType) => {
  // const challenge = props;

  const fixedDifficultyName = difficultyName[0].toUpperCase() + difficultyName.slice(1, 10000);
  const getColor = () => {
    const difficulty = difficultyLevel;
    if (difficulty === 1) return "primary";
    else if (difficulty === 2) return "orange";
    else if (difficulty === 3) return "red";
    else return "error with colors";
  }
  return (
    <View className="min-h-52 mb-4 rounded-3xl bg-background shadow-md flex flex-row overflow-hidden">
      <View className="w-2/3 p-3 justify-between">
        <View>
          <Text className="text-2xl font-bold">{title}</Text>
          <Text className="text-base">{description}</Text>
        </View>
        <View>
          <Text className={`text-primary text-3xl text-${getColor()}`}>{fixedDifficultyName}</Text>
          <Text className="text-left text-gray-300">#{challengeGroup} #eko</Text>
        </View>
      </View>

      <View className={`w-1/3 flex justify-center items-center bg-${getColor()}`}>
        <Text className="text-secondary text-6xl">{pointsToGain}</Text>
        <Text className="text-secondary text-2xl">punktów</Text>
      </View>
    </View>
  );
};
export default Challenge;
