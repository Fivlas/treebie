import { View, Text } from "react-native";
import { ChallengeType } from "./ChallengesList";
export const Challenge = (props: ChallengeType) => {
  const challenge = props;
  const newDesc = challenge.description;
  const fixedDifficultyName = challenge.difficultyName[0].toUpperCase() + challenge.difficultyName.slice(1, 10000);
  
  return (
    <View className="rounded-lg h-40 bg-background shadow flex flex-row overflow-hidden">
      {/* <Text className="text-3xl font-bold">{challenge.title}</Text>
      <Text className="w-full text-gray-300">{newDesc.slice(0, 10000)}</Text>
      <Text>Stopień trudności</Text>
      <Text className={"text-3xl " + getColor()}>{fixedDifficultyName}</Text> */}
      <View className="w-2/3">
      <Text className="text-2xl font-bold p-2">{challenge.title}</Text>

      </View>
      <View className="w-1/3 flex justify-center items-center bg-primary">
        <Text className="text-secondary text-6xl">{challenge.pointsToGain}</Text>
      </View>
    </View>
  );
};
export default Challenge;
