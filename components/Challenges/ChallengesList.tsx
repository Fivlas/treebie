import { View, Text } from "react-native";
import Challenge from "./Challenge";
export type ChallengeType = {
    title: string;
    description: string;
    difficultyLevel: number;
    difficultyName: string;
    pointsToGain: number;
    challengeGroup: string;
}
const ChallengesList = (props: any) => {

  const challenges = props.challenges;
  return (
    <View>
        {challenges && challenges.map((challenge: ChallengeType, index: number) => {
            <Challenge {...challenge}/>
        })}
    </View>
  );
};
export default ChallengesList;
