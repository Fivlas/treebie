import CustomButton from "@/components/elements/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const index = () => {
    const local = useLocalSearchParams();

    return (
        <SafeAreaView>
            <Text>{local.id}</Text>
            <CustomButton title="Back" handlePress={() => router.push("/(tabs)/")} buttonType="primary"/>
        </SafeAreaView>
    );
};

export default index;
