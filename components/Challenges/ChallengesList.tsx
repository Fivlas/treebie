import { ScrollView } from "react-native";
import { FIREBASE_DB } from "@/functions/firebaseConfig";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import Challenge from "./Challenge";

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

const ChallengesList = ({ queryToFilter }: ChallengeProps) => {
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);
  const [questsDone, setQuestsDone] = useState<string[]>([]);
  const { user, loading } = useUser();

  const fetchUserQuestsDone = async (userId: string) => {
    try {
      const userDocRef = doc(FIREBASE_DB, "users", userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
  
      const userQuestsDone = Array.isArray(userData?.questsDone) ? userData.questsDone : [];
      setQuestsDone(userQuestsDone);
    } catch (error) {
      console.error("Error fetching user's questsDone data:", error);
      setQuestsDone([]);
    }
  };

  const fetchChallenges = async () => {
    try {
      const challengesCollectionRef = collection(FIREBASE_DB, "quests");
      const challengesQuery = query(challengesCollectionRef);
      const querySnapshot = await getDocs(challengesQuery);
  
      const everyChallenge: ChallengeType[] = querySnapshot.docs.map((doc) => ({
        //@ts-ignore
        id: doc.id,
        ...(doc.data() as ChallengeType),
      }));
  
      const questsDoneArray = Array.isArray(questsDone) ? questsDone : [];
  
      const uncompletedChallenges = everyChallenge.filter(
        (challenge) => !questsDoneArray.includes(challenge.id)
      );
  
      setChallenges(uncompletedChallenges);
    } catch (error) {
      console.error("Error fetching challenges from Firestore:", error);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      fetchUserQuestsDone(user.uid).then(fetchChallenges);
    }
  }, [user, loading, questsDone]);

  const getColor = (level: number | undefined) => {
    switch (level) {
      case 1:
        return { text: "text-primary", bg: "bg-primary" };
      case 2:
        return { text: "text-orange", bg: "bg-orange" };
      case 3:
        return { text: "text-red", bg: "bg-red" };
      default:
        return { text: "text-gray", bg: "bg-gray" };
    }
  };

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
            .map((challenge) => {
              const color = getColor(challenge.difficultyLevel);
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
                  color={color}
                />
              );
            })
        : challenges &&
          challenges.map((challenge) => {
            const color = getColor(challenge.difficultyLevel);
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
                color={color}
              />
            );
          })}
    </ScrollView>
  );
};

export default ChallengesList;
