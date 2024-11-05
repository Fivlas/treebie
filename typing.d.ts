interface TipData {
    imageName: string;
    title: string;
    popularity: number;
    description: string;
    list?: string[];
}

interface TipFields extends TipData {
    id: string;
}