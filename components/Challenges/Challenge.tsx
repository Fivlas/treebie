import { View, Text } from "react-native";
import { ChallengeType } from "./ChallengesList";
export const Challenge = (props: ChallengeType) => {
  const challenge = props;
  const newDesc = challenge.description;
  const fixedDifficultyName = challenge.difficultyName[0].toUpperCase() + challenge.difficultyName.slice(1, 10000);
  const getColor = () => {
    if(challenge.difficultyLevel === 1) {
      return 'text-primary';
    }
    else if(challenge.difficultyLevel === 2) {
      return 'text-orange-600';
    }
    else if (challenge.difficultyLevel === 3) {
      return 'text-red-600';
    }
    else {
      return "error with color"
    }
  }
  return (
    <View className=" rounded-lg p-2 h-72 bg-background shadow ">
      <Text className="text-3xl font-bold">{challenge.title}</Text>
      <Text className="text-tint border w-72 text-primary">{newDesc.slice(0, 40)}...</Text>
      <Text>Stopień trudności</Text>
      <Text className={"text-3xl " + getColor()}>{fixedDifficultyName}</Text>
    </View>
  );
};
export default Challenge;
