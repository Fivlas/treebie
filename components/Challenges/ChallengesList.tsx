import { Button, ScrollView, View } from "react-native";
import Challenge from "./Challenge";
export type ChallengeType = {
  title: string;
  description: string;
  difficultyLevel: number;
  difficultyName: string;
  pointsToGain: number;
  challengeGroup: string;
};

const ChallengesList = (props: any) => {
  const challenges = props.challenges;
  return (
    <View>
      <ScrollView className="mb-2">
      {challenges &&
        challenges.map((challenge: ChallengeType) => (
          <Challenge
            key={challenge.title}
            title={challenge.title}
            description={challenge.description}
            difficultyLevel={challenge.difficultyLevel}
            pointsToGain={challenge.pointsToGain}
            challengeGroup={challenge.challengeGroup}
            difficultyName={challenge.difficultyName}
          />
        ))}
    </ScrollView>
    </View>
  );
};
export default ChallengesList;
