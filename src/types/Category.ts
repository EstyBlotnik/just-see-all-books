export const ParentCategoryValues = Object.freeze([
    "עיון",
    "פרוזה",
    "ילדים ונוער",
]);
export type ParentCategory = (typeof ParentCategoryValues)[number];
export interface Category {
    name: string;
    parentCategory: ParentCategory;
}