import { StyleSheet, View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import React from "react";

type InputType = "text" | "password" | "email";

type CustomInputOptions = {
    type?: InputType,
    placeholder?: string,
    value?: string,
    onChangeText?: ((text: string) => void) | undefined
};

export function CustomInput({ type, placeholder, value, onChangeText, ...rest }: Readonly<CustomInputOptions>) {
    if (type === undefined) type = "text";
    return (<View style={styles.container} {...rest}>
        <TextInput
            className={"border-gray-300 border-solid border-2 rounded-lg p-2 w-full bg-secondary"}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            placeholder={placeholder === undefined ? type.charAt(0).toUpperCase() + type.slice(1) : placeholder}
            autoCapitalize="none"
            value={value}
            onChangeText={onChangeText}
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 6
    }
});