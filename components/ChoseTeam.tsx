import { View } from "react-native";
import ScrollCard from "./HomePage/ScrollCard";
import { Text  } from "react-native";

interface ChoseTeamProps{
    onTreeSelect: (number: string) => void;
}

export default function ChoseTeam({onTreeSelect} : ChoseTeamProps){
    return (
        <View className="p-12">
            <Text className="text-center text-4xl font-bold">Wybierz drużyne</Text>
            <View className="flex flex-row">
                <ScrollCard id="team1" title="Team 1" imageName="https://www.fivlas.pl/sadzenie-drzew.png" onClick={() => onTreeSelect("1")}/>
                <ScrollCard id="team2" title="Team 2" imageName="https://www.fivlas.pl/sadzenie-drzew.png" onClick={() => onTreeSelect("2")}/>
            </View>
        </View>
    )
}