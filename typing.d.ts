interface TipData {
    imageName: string;
    title: string;
    popularity: number;
}

interface TipFields extends TipData {
    id: string;
}