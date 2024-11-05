import { View, Text, TouchableOpacity } from "react-native";
import { ChallengeType } from "./ChallengesList";
import { router } from "expo-router";
const Challenge = ({
  id,
  title,
  description,
  difficultyLevel,
  pointsToGain,
  challengeGroup,
  difficultyName,
}: ChallengeType) => {

  const fixedDifficultyName =
    difficultyName[0].toUpperCase() + difficultyName.slice(1, 10000);
  const getColor = () => {
    if (difficultyLevel === 1) return "primary";
    else if (difficultyLevel === 2) return "orange";
    else if (difficultyLevel === 3) return "red";
    else return "error with colors";
  };
  return (
    <TouchableOpacity onPress={() => router.push(`/challenge/${id}`)}>
      <View  className="my-2 rounded-lg bg-background shadow flex flex-row overflow-hidden">
        <View className="w-2/3 p-3">
          <Text className="text-2xl font-bold">{title}</Text>
          <Text className="text-base">{description}</Text>
          <Text className={`text-3xl text-${getColor()}`}>
            {fixedDifficultyName}
          </Text>
          <Text className="text-right text-gray-300">
            #{challengeGroup} #eko
          </Text>
        </View>
        <View
          className={`w-1/3 flex justify-center items-center bg-${getColor()}`}
        >
          <Text className="text-secondary text-6xl">{pointsToGain}</Text>
          <Text className="text-secondary text-2xl">punktów</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Challenge;