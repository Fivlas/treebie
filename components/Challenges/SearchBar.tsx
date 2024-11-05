import { TextInput, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { useState } from "react";
import CustomButton from "../elements/CustomButton";
import { View } from "react-native";
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
    <View className="mb">
      <TextInput
        onChange={handleInputChange}
        value={query}
        placeholder="Szukaj"
        className="bg-white text-black text-xl border border-gray-300 rounded-lg pl-4 h-16 mb-2"
      />
      <CustomButton title="Szukaj" buttonType="primary" handlePress={handleClick} />
    </View>
  );
}; 

export default SearchBar;
