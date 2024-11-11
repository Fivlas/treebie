import React from 'react'
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

const Message = ({ message, isAi = false }: MessageType) => {
    const markdownStyle = isAi ? styles.textPrimary : styles.textSecondary;

    return (
        <View className={`${isAi ? "justify-start" : "justify-end"} flex-row`}>
            <View className={`${isAi ? "bg-secondary" : "bg-primary"} max-w-[80%] rounded-2xl shadow-sm`}>
                <Markdown style={{body: markdownStyle }}>{message}</Markdown>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textPrimary: {
        color: '#606c38',
        padding: 6,
        paddingHorizontal: 16,
    },
    textSecondary: {
        color: '#fefae0',
        padding: 6,
        paddingHorizontal: 16,

    },
    padding4: {
        padding: 16,
    }
});

export default Message

