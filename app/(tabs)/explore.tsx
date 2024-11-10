import { View, Text, SafeAreaView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FIREBASE_DB } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/elements/CustomButton";

const index = () => {
  const [challenge, setChallenge] = useState<object | any>();
  const local = useLocalSearchParams();

  // useEffect(() => {
  //   const getData = async (id: string) => {
  //     try {
  //       const docRef = doc(FIREBASE_DB, "quests", id);
  //       const res = await getDoc(docRef);
  //       setChallenge(res.data());
  //     } catch (error) {
  //       console.error("Error fetching document: ", error);
  //     }
  //   };
  //   getData(local.id.toString());
  // }, []);

  return (
    <SafeAreaView>
      <Text className="text-4xl font-bold">{challenge?.title}To jest tytuł</Text>
      <Text></Text>
    </SafeAreaView>
  );
};
export default index;
