import {StyleSheet, View, TextInput} from "react-native";
import React from "react";

type InputType = "text" | "password" | "email";

type CustomInputOptions = {
    type?: InputType,
    placeholder?: string,
    val?: string,
    onChange?: (text: string) => void
};

export function CustomInput({type, placeholder, val, onChange, ...rest}: Readonly<CustomInputOptions>) {
    if (type === undefined) type = "text";
    return (<View style={styles.container} {...rest}>
        <TextInput
            className={"border-gray-300 border-solid border-2 rounded-lg p-2 w-full bg-secondary"}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            placeholder={placeholder === undefined ? type.charAt(0).toUpperCase() + type.slice(1) : placeholder}
            placeholderTextColor="#63784f"
            autoCapitalize="none"
            value={val}
            onChangeText={onChange}
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 6
    }
});
