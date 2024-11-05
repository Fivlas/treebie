import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const JumpingBubbles = () => {
    // Create refs for each animated bubble
    const bubble1 = useRef(new Animated.Value(1)).current;
    const bubble2 = useRef(new Animated.Value(1)).current;
    const bubble3 = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Define the jumping animation
        //@ts-ignore
        const animateBubble = (bubble) => {
            return Animated.sequence([
                Animated.timing(bubble, {
                    toValue: 1.5, // Scale up
                    duration: 300,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(bubble, {
                    toValue: 1, // Scale back down
                    duration: 300,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]);
        };

        // Start looping animation with delays for each bubble
        Animated.loop(
            Animated.stagger(150, [
                animateBubble(bubble1),
                animateBubble(bubble2),
                animateBubble(bubble3),
            ])
        ).start();
    }, [bubble1, bubble2, bubble3]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bubble, { transform: [{ scale: bubble1 }] }]} />
            <Animated.View style={[styles.bubble, { transform: [{ scale: bubble2 }] }]} />
            <Animated.View style={[styles.bubble, { transform: [{ scale: bubble3 }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        marginHorizontal: 10,
    },
    bubble: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#798156',
        marginHorizontal: 4,
    },
});

export default JumpingBubbles;
