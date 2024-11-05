import { Button, ScrollView, View } from "react-native";
import Challenge from "./Challenge";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { FIREBASE_DB } from '@/firebase.config';
export type ChallengeType = {
  id: string;
  title: string;
  description: string;
  difficultyLevel: number;
  difficultyName: string;
  pointsToGain: number;
  challengeGroup: string;
};

const ChallengesList = (props: any) => {
  const [challenges, setChallenges] = useState<ChallengeFields[]>([]);
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesCollectionRef = collection(FIREBASE_DB, "quests"); // Challenges is set as quests in database;
        const challengesQuery = query(challengesCollectionRef);
        const querySnapshot = await getDocs(challengesQuery);

        const everyChallenge: ChallengeFields[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as ChallengeData
        }));
        
        setChallenges(everyChallenge);
      }
      catch (e) {
        console.log("Error fetching tips data from Firestore: ", e)
      }
    }
    fetchChallenges();
  },[])
  // FILTROWANIE (wartosc i odbieranie query gotowe)
  return (
    <View>
      <ScrollView className="mb-2">
      {challenges &&
        challenges.map((challenge) => (
          <Challenge
            key={challenge.id}
            id={challenge.id}
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

