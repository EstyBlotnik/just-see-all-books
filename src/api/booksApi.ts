import type { Book } from '../types/Book';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = async (page: number, limit: number = 15): Promise<Book[]> => {
    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }
    const data: { books: Book[] } = await res.json();
    return data.books;
};
