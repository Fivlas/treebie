import { TextInput, Text, View, Pressable } from "react-native"
const SearchBar = () => {
    return <View>
        <TextInput placeholder="Znajdź wyzwanie..." className="bg-white text-black text-xl border border-gray-300 rounded-lg pl-4 h-16 mb-2"/>
        <Pressable className="border h-16 mx-auto w-full flex justify-center items-center bg-text rounded-lg" >
            <Text className="text-2xl bg-text text-white ">Szukaj</Text>
        </Pressable>
    </View>;
}

export default SearchBar;