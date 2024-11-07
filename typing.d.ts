interface TipData {
    imageName: string;
    title: string;
    popularity: number;
}
interface ChallengeData {
    title: string;
    description: string;
    difficultyLevel: number;
    pointsToGain: number;
    challengeGroup: string;
    difficultyName: string;
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

interface ChallengeFields extends ChallengeData {
    id: string;
}