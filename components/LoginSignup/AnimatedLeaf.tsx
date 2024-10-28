import {View} from "react-native";

export type AnimatedLeafOptions = {
    className: string | undefined;
};

export function AnimatedLeaf({className}: Readonly<AnimatedLeafOptions>) {
    return <View className={`rounded-full border-200  border-solid ${className}`}></View>
}