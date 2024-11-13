import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const JumpingBubbles = () => {
    const bubble1 = useRef(new Animated.Value(1)).current;
    const bubble2 = useRef(new Animated.Value(1)).current;
    const bubble3 = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animateBubble = (bubble: Animated.Value) => {
            return Animated.sequence([
                Animated.timing(bubble, {
                    toValue: 1.5,
                    duration: 300,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(bubble, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]);
        };

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
