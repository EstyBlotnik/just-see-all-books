import type { Book } from '../types/Book';

const API_URL = import.meta.env.VITE_API_URL;

interface FetchBooksParams {
    page: number;
    sortBy: string;
    search?: string;
}

export const fetchBooks = async ({ page, sortBy, search }: FetchBooksParams): Promise<
    {
        books: Book[];
        hasMore: boolean;
    }
> => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('sortBy', sortBy);
    params.append('limit', '15');
    if (search) params.append('search', search);
    const res = await fetch(`${API_URL}?${params.toString()}`);
    const data = await res.json();
    console.log(data);
    console.log(res)
    if (!res.ok) throw new Error('Failed to fetch books');
    return data;
};