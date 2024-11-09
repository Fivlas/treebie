interface TipData {
    imageName: string;
    title: string;
    popularity: number;
    description: string;
    list?: string[];
}
interface ChallengeData {
    title: string;
    description: string;
    difficultyLevel: number;
    pointsToGain: number;
    challengeGroup: string;
    difficultyName: string;
}


interface TipFields extends TipData {
    id: string;
}
interface ChallengeFields extends ChallengeData {
    id: string;
}
interface ShopItemData {
    name: string;
    price: number;
    image: string;
}
interface ShopItem extends ShopItemData {
    id: string;
}

interface MessageType {
    message: string;
    isAi: boolean;
}