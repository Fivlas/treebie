import {View, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

export type AnimatedLeafOptions = {
    className?: string | undefined;
};

export function AnimatedLeaf({ className }: Readonly<AnimatedLeafOptions>) {
    const width = Dimensions.get("window").width;
    return (
        <View style={[{ borderRadius: width / 2, overflow: 'hidden' }]} className={className}>
            <LinearGradient
                colors={['#606c38', '#949f68']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    width: width,
                    height: width,
                }}
            />
        </View>
    );
}