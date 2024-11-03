import { TextInput, Text, View, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { useState } from "react";
import CustomButton from "../elements/CustomButton";
const SearchBar = () => {
    const [query, setQuery] = useState<string>("");
    const handleInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setQuery(event.nativeEvent.text); 
      };
    return <View className="mb-2">
        <TextInput value={query} onChange={handleInputChange} placeholder="Znajdź wyzwanie..." className="bg-white text-black text-xl border border-gray-300 rounded-lg pl-4 h-16 mb-2"/>
        <CustomButton title="Szukaj" buttonType="primary"/>
    </View>;
}

export default SearchBar;