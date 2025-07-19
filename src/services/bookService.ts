import axios from "axios";
import type { Book } from "../types/Book";
const api = `${import.meta.env.VITE_API_BASE_URL}/book`;

interface PageResponse {
  books: Book[]; //
  currentPage: number;
  total: number;
  totalPages: number;
}

export const get_all_books = async (
  page = 1,
  limit = 20,
  filters: Record<string, string | string[]>
): Promise<PageResponse> => {
  try {
    const queryParams: string[] = [];
    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);
    for (const key in filters) {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            queryParams.push(`${key}=${encodeURIComponent(v)}`);
          });
        } else {
          queryParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    }
    const queryString = queryParams.join("&");
    console.log(queryString);
    const url = `${api}?${queryString}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("לא מצאנו מידע על ספרים במערכת");
  }
};

export const get_book_by_id = async (bookId: string) => {
  try {
    const response = await axios.get(`${api}/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error("בעיה בטעינת הספר.");
  }
};
