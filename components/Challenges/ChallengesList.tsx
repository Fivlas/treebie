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
  console.log(challenges[0].title)
  const temp = challenges[1];
  return (
    <View>
        {challenges.map((challenge: ChallengeType, index: number) => {
            <Challenge key={index} {...challenge}/>
        })}
        <Challenge {...temp}/>
    </View>
  );
};
export default ChallengesList;
