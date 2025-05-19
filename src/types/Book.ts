export interface Book {
    id: number;
    title: string;
    author: string;
    coverImageUrl?: string;
    imageUrl: string;
    collectionLinks?: { name: string; url: string }[];
    isUsed?: boolean;
    condition?: string;
    price: number;
}
