import { SafeAreaView, Text } from "react-native";
import SearchBar from "../../components/Challenges/SearchBar";
export default function Challenges() {
    const data = [
      {
        title: "Uzbieraj 3 śmieci",
        description: "Znajdź 3 odpady w twojej okolicy, które nie powinny się tam znaleźć i wyrzuć je w odpowiednie miejsce.",
        difficultyLevel: 1,
        difficultyName: "Łatwy",
        pointsToGain: 50
      } 
    ];
  return (
    <SafeAreaView>
      <SearchBar />
    </SafeAreaView>
  );
}
