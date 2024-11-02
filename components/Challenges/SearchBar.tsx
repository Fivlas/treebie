import { TextInput, StyleSheet } from "react-native"
import { View } from "react-native";


const SearchBar = () => {
    return <View className="border flex justify-center">
        <TextInput placeholder="Type something" className="text-lg h-10 border w-1/2"/>
    </View>;
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderColor: 'black',
        borderWidth: 2
    }
})
export default SearchBar;