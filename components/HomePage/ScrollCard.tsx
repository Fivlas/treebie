import { Image, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface ScrollCardProps {
    id: string;
    title: string;
    imageName: string;
    containerStyle?: string;
}

const ScrollCard = ({ id, title, imageName, containerStyle }: ScrollCardProps) => {
    return (
        //@ts-ignore
        <TouchableOpacity onPress={() => router.push(`/tip/${id}`)} activeOpacity={0.7}>
            {/* <View className="bg-[#f2f3ef] w-44 h-52 rounded-3xl justify-center items-center mr-4"> */}
            <View className={`bg-[#f2f3ef] w-44 h-52 rounded-3xl justify-center items-center ${containerStyle}`}>
                <Image source={require(`@/assets/images/logo-icon-new.png`)} className="w-12 h-12" />
                <Text className="mt-2 text-text font-medium text-left">{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ScrollCard;
