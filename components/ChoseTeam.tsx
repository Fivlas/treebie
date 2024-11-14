import { View } from "react-native";
import ScrollCard from "./HomePage/ScrollCard";
import { ThemedText } from "./ThemedText";

interface ChoseTeamProps{
    onTreeSelect: (number: string) => void;
}

export default function ChoseTeam({onTreeSelect} : ChoseTeamProps){
    return (
        <View className="p-12">
            <ThemedText className="text-center text-4xl font-bold">Wybierz drużyne</ThemedText>
            <View className="flex flex-row gap-5 mt-6">
                <ScrollCard id="team1" title="Team 1" imageName="https://www.fivlas.pl/tree1-lvl3.png" team onClick={() => onTreeSelect("1")}/>
                <ScrollCard id="team2" title="Team 2" imageName="https://www.fivlas.pl/tree2-lvl3.png" team onClick={() => onTreeSelect("2")}/>
            </View>
        </View>
    )
}
