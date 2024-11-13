import { ScrollView, View } from "react-native";
import { Challenge } from "./Challenge";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase.config";
export type ChallengeType = {
  id: string;
  title: string;
  description?: string;
  difficultyLevel?: number;
  difficultyName?: string;
  pointsToGain?: number;
  challengeGroup?: string;
  color?: { text: string; bg: string } | undefined;
  asActive?: boolean;
};
type ChallengeProps = {
  queryToFilter: string;
};
const ChallengesList = (props: ChallengeProps) => {
  const queryToFilter = props.queryToFilter;
  const [challenges, setChallenges] = useState<ChallengeFields[]>([]);
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesCollectionRef = collection(FIREBASE_DB, "quests"); // Challenges is set as quests in database;
        const challengesQuery = query(challengesCollectionRef);
        const querySnapshot = await getDocs(challengesQuery);

        const everyChallenge: ChallengeFields[] = querySnapshot.docs.map(
          (doc) => ({
            //@ts-ignore
            id: doc.id,
            ...(doc.data() as ChallengeData),
          })
        );

        setChallenges(everyChallenge);
      } catch (e) {
        console.log("Error fetching tips data from Firestore: ", e);
      }
    };
    fetchChallenges();
  }, []);
  // FILTROWANIE (wartosc i odbieranie query gotowe)
  return (
    <ScrollView
      className="px-4"
      showsVerticalScrollIndicator={false}
      decelerationRate={0}
      snapToInterval={230}
      snapToAlignment={"start"}
    >
      {queryToFilter.length > 0
        ? challenges
            .filter((item) =>
              item.title.toLowerCase().includes(queryToFilter.toLowerCase())
            )
            .map((challenge: ChallengeData) => {
              const getColor = (level: number) => {
                if (level === 1)
                  return { text: "text-primary", bg: "bg-primary" };
                if (level === 2)
                  return { text: "text-orange", bg: "bg-orange" };
                if (level === 3) return { text: "text-red", bg: "bg-red" };
                else console.log("Color error");
              };
              return (
                <Challenge
                  key={challenge.id}
                  id={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  difficultyLevel={challenge.difficultyLevel}
                  pointsToGain={challenge.pointsToGain}
                  challengeGroup={challenge.challengeGroup}
                  difficultyName={challenge.difficultyName}
                  color={getColor(challenge.difficultyLevel)}
                />
              );
            })
        : challenges &&
          challenges.map((challenge: ChallengeData) => {
            const getColor = (level: number) => {
              if (level === 1)
                return { text: "text-primary", bg: "bg-primary" };
              if (level === 2) return { text: "text-orange", bg: "bg-orange" };
              if (level === 3) return { text: "text-red", bg: "bg-red" };
              else console.log("Color error");
            };
            return (
              <Challenge
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                difficultyLevel={challenge.difficultyLevel}
                pointsToGain={challenge.pointsToGain}
                challengeGroup={challenge.challengeGroup}
                difficultyName={challenge.difficultyName}
                color={getColor(challenge.difficultyLevel)}
              />
            );
          })}
    </ScrollView>
  );
};
export default ChallengesList;
