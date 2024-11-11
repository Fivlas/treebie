interface TipData {
    imageName: string;
    title: string;
    popularity: number;
    description: string;
    list?: string[];
}
interface ChallengeData {
    id: string;
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


interface MessageType {
    message: string;
    isAi: boolean;
}