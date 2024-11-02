import { SafeAreaView, Text, View } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
import ChallengesList from "@/components/Challenges/ChallengesList";
export default function Challenges() {
  const challenges = [
    {
        title: "Zbieraj 5 puszek",
        description: "Znajdź i zbierz 5 puszek w najbliższym parku lub lesie i wrzuć je do pojemnika na aluminium.",
        difficultyLevel: 1,
        difficultyName: "łatwy",
        pointsToGain: 30,
        challengeGroup: "Zbieranie"
    },
    {
        title: "Posadź kwiaty",
        description: "Kup sadzonki kwiatów i posadź je w swojej okolicy, aby upiększyć środowisko.",
        difficultyLevel: 2,
        difficultyName: "średni",
        pointsToGain: 60,
        challengeGroup: "Sadzenie"
    },
    {
        title: "Oszczędzaj energię w domu",
        description: "Przez 3 dni wyłączaj światło w każdym pomieszczeniu, gdy wychodzisz. Pomóż zmniejszyć zużycie energii!",
        difficultyLevel: 1,
        difficultyName: "łatwy",
        pointsToGain: 30,
        challengeGroup: "Energia"
    },
    {
        title: "Oszczędzanie wody",
        description: "Podczas mycia zębów zakręć kran, aby nie marnować wody. Powtarzaj przez tydzień.",
        difficultyLevel: 1,
        difficultyName: "łatwy",
        pointsToGain: 30,
        challengeGroup: "Zmiana nawyków"
    },
    {
        title: "Nie używaj samochodu przez 3 dni",
        description: "Przez 3 dni korzystaj z komunikacji miejskiej lub roweru zamiast samochodu.",
        difficultyLevel: 2,
        difficultyName: "średni",
        pointsToGain: 60,
        challengeGroup: "Transport"
    },
    {
        title: "Rozmowa o ekologii",
        description: "Porozmawiaj z kimś o znaczeniu ekologii i wymieńcie się wskazówkami, jak oszczędzać zasoby.",
        difficultyLevel: 3,
        difficultyName: "trudny",
        pointsToGain: 100,
        challengeGroup: "Interakcje"
    },
    {
        title: "Kup produkty bez plastiku",
        description: "Przez 3 dni wybieraj tylko produkty, które nie są opakowane w plastik.",
        difficultyLevel: 2,
        difficultyName: "średni",
        pointsToGain: 60,
        challengeGroup: "Zakupy"
    },
    {
        title: "Sprzątanie plaży",
        description: "Wybierz się na plażę i zbierz śmieci, które znajdziesz na brzegu.",
        difficultyLevel: 3,
        difficultyName: "trudny",
        pointsToGain: 100,
        challengeGroup: "Zbieranie"
    },
    {
        title: "Posadź drzewko",
        description: "Kup sadzonkę drzewa i posadź ją w swojej okolicy, aby pomóc środowisku.",
        difficultyLevel: 2,
        difficultyName: "średni",
        pointsToGain: 60,
        challengeGroup: "Sadzenie"
    },
    {
        title: "Zminimalizuj odpady",
        description: "Przez tydzień unikaj kupowania produktów w jednorazowych opakowaniach.",
        difficultyLevel: 3,
        difficultyName: "trudny",
        pointsToGain: 100,
        challengeGroup: "Zmiana nawyków"
    }
];

  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="text-4xl font-bold mb-2">Wyzwania</Text>
        <SearchBar />
        <ChallengesList challenges={challenges}/>
      </View>
    </SafeAreaView>
  );
}
