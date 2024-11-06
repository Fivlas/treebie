import CustomButton from "@/components/elements/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase.config";
import { View } from "react-native";

const index = () => {
  const [tip, setTip] = useState<object | any>();
  const local = useLocalSearchParams();
  
  useEffect(() => {
    const getData = async (id: string) => {
      try {
        const docRef = doc(FIREBASE_DB, "tips", id);
        const res = await getDoc(docRef);
        setTip(res.data())
        
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    getData(local.id.toString());
  }, []);
  return (
    <SafeAreaView>
      <View>
      <Text className="text-2xl">{tip.title}dwdw</Text>
      <Text>dqwdwd</Text>
      <CustomButton
        title="Back"
        handlePress={() => router.push("/(tabs)/")}
        buttonType="primary"
      />
      </View>
    </SafeAreaView>
    
  );
};

export default index;
