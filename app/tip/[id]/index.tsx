import CustomButton from "@/components/elements/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, SafeAreaView, Text, View, Platform } from "react-native";
import { useEffect, useState } from "react";

const index = () => {
    const [data, setData] = useState(null);  // Stores fetched data
    const [loading, setLoading] = useState(true);  // Tracks loading state
    const local = useLocalSearchParams();

    // const fetchData = async () => {
    //     try {
    //         const tip = await firestore()
    //             .collection('tips')
    //             .get();
    //         console.log(tip);
    //         // setData(tip);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } finally {
    //         setLoading(false);  // End loading
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // dn28jsvwmtKdXJxzCNH9


    return (
        <SafeAreaView>
            {/* @ts-ignore */}
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>{local.id}</Text>}
            <CustomButton
                title="Back"
                handlePress={() => router.push("/(tabs)/")}
                buttonType="primary"
            />
        </SafeAreaView>
    );
};

export default index;
