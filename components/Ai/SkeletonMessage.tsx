import React from 'react'
import { View } from 'react-native';
import JumpingBubbles from './JumpingBubbles';

const SkeletonMessage = () => {
    return (
        <View className="justify-start flex-row">
            <View className="bg-secondary max-w-[80%] rounded-2xl shadow-sm">
                <JumpingBubbles/>
            </View>
        </View>
    )
}

export default SkeletonMessage