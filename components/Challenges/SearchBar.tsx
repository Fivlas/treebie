import { TextInput, Text, View, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { useState } from "react";
const SearchBar = () => {
    const [query, setQuery] = useState<string>("");
    const handleInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setQuery(event.nativeEvent.text); 
      };
    return <View className="mb-2">
        <TextInput value={query} onChange={handleInputChange} placeholder="Znajdź wyzwanie..." className="bg-white text-black text-xl border border-gray-300 rounded-lg pl-4 h-16 mb-2"/>
        <Pressable className="border h-16 mx-auto w-full flex justify-center items-center bg-text rounded-lg" >
            <Text className="text-2xl bg-text text-white ">Szukaj</Text>
        </Pressable>
        <Text>{query}qwdqwd</Text>
    </View>;
}

export default SearchBar;