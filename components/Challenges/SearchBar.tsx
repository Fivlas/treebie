import {
  TextInput,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from "react-native";
import { useState } from "react";
import CustomButton from "../elements/CustomButton";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
interface SearchBarProps {
  getData: (q: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ getData }) => {
  const [query, setQuery] = useState("");
  const colorScheme = useColorScheme();

  const handleInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setQuery(event.nativeEvent.text);
    getData(query);
  };

  return (
    <View className="px-8 my-4">
      <View
        className={`flex-row items-center ${
          colorScheme === "light" ? "bg-lightBg" : "bg-darkBg"
        } mt-4 p-4 rounded-lg`}
      >
        <TextInput
          className={`flex-1 ml-2 text-gray-700 ${
            colorScheme === "light" ? "text-darkBg" : "text-lightBg"
          }`}
          placeholder="Szukaj"
          placeholderTextColor={
            colorScheme === "light" ? "text-lightBg" : "text-darkBg"
          }
          onChange={handleInputChange}
        />
        <Ionicons name="search-outline" size={24} color={
            colorScheme === "light" ? "#3A3A3A" : "#f2f3ef"
          } />
      </View>
    </View>
  );
};

export default SearchBar;
