import { TextInput, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { useState } from "react";
import CustomButton from "../elements/CustomButton";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
interface SearchBarProps {
  getData: (q: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ getData }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setQuery(event.nativeEvent.text);
  };

  const handleClick = () => {
    getData(query);
  }

  return (
    <View className="px-8 my-4">
      {/* <TextInput
        onChange={handleInputChange}
        value={query}
        placeholder="Szukaj"
        className="bg-white text-black text-xl border border-gray-300 rounded-lg pl-4 h-16 mb-2"
      />
      <CustomButton title="Szukaj" buttonType="primary" handlePress={handleClick} /> */}
      <View className="flex-row items-center bg-[#f2f3ef] mt-4 p-4 rounded-lg">
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Szukaj"
          placeholderTextColor="#63784f"
          onChange={handleInputChange}
        />
        <Ionicons name="search-outline" size={24} color="black" onPress={handleClick} />
      </View>
    </View>
  );
};

export default SearchBar;
