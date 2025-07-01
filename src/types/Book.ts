import type { Category } from './Category';
import type { Publisher } from './Publisher';

export const CoverTypeValues = ['רכה', 'קשה', 'קרטון', 'כללי'] as const;
export const conditionTypeValues = ['כחדש', 'טוב', 'סביר'] as const;
export const LocationValues = ['בית', 'מחסן', 'אחר'] as const;

export type CoverType = (typeof CoverTypeValues)[number];
export type conditionType = (typeof conditionTypeValues)[number];
export type LocationType = typeof LocationValues;
export interface Book {
  _id: string;
  SKU: number;
  title: string;
  condition: conditionType;
  price: number;
  categories: Category[];
  stock: number;
  sold: number;
  views: number;
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
  isActive?: boolean;
}
