import type { Book } from '../types/Book';

const API_URL = import.meta.env.VITE_API_URL;

interface FetchBooksParams {
    page: number;
    sortBy: string;
}

export const fetchBooks = async ({ page, sortBy }: FetchBooksParams): Promise<Book[]> => {
    const res = await fetch(
        `${API_URL}?page=${page}&sortBy=${sortBy}`
    );
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return data.books;
};