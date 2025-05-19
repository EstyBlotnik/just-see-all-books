import type { Category } from "./Category";
import type { Publisher } from "./Publisher";

export const CoverTypeValues = ["רכה", "קשה", "קרטון", "כללי"] as const;
export const conditionTypeValues = ["כחדש", "טוב", "סביר"] as const;
export const LocationValues = ["בית", "מחסן", "אחר"] as const;

export type CoverType = (typeof CoverTypeValues)[number];
export type conditionType = (typeof conditionTypeValues)[number];
export type LocationType = typeof LocationValues;
export interface Book {
    _id: number;
    SKU: number;
    title: string;
    condition: conditionType;
    price: number; // Price of the book
    categories: Category[]; // Categories array (at least one category required)
    stock: number; // Quantity in stock
    sold: number; // Number of items sold (default: 0)
    views: number; // Number of views (default: 0)
    author: string;
    publisher: Publisher;
    coverType: CoverType;
    yearOfPublication: number;
    image: string;
    description: string;
    rare: boolean;
    signed: boolean;
    salePrice: number;
    sellerNotes: string;
    customerNotes: string;
    bookLocation: LocationType;
}
