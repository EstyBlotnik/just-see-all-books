export interface Book {
    id: number;
    title: string;
    author: string;
    coverimage?: string;
    image: string;
    collectionLinks?: { name: string; url: string }[];
    isUsed?: boolean;
    condition?: string;
    price: number;
}
