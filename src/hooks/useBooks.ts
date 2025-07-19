import {
  useQueryClient,
  useInfiniteQuery,
  type InfiniteData,
} from '@tanstack/react-query';
import type { Book } from '../types/Book';
import { get_all_books, get_book_by_id } from '../services/bookService';

interface Filters {
  q?: string;
  category?: string[];
}

export interface PageResponse {
  books: Book[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const serializeFilters = (
  filters: Filters
): Record<string, string | string[]> => {
  const serialized: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        serialized[key] = value; // ← לא מצרף למחרוזת! שומר כמערך
      } else {
        serialized[key] = value;
      }
    }
  }
  return serialized;
};

function createFilterVariants(filters: Filters) {
  const serialized = serializeFilters(filters);

  const filtersForQueryKey = Object.fromEntries(
    Object.entries(serialized).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value,
    ])
  );

  return {
    filtersForQueryKey, // For React Query
    filtersForQueryFn: serialized, // For API call
  };
}

export const useBooks = (filters: Filters = {}) => {
  const queryClient = useQueryClient();
  const { filtersForQueryKey, filtersForQueryFn } = createFilterVariants(filters);
  // Fetch books
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<
    PageResponse,
    Error,
    InfiniteData<PageResponse>,
    [string, Record<string, string>],
    number
  >({
    queryKey: ['books', filtersForQueryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return get_all_books(Number(pageParam), 20, filtersForQueryFn);
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 60 * 5,
  });

  const books = data?.pages.flatMap((page) => page.books) || [];

  const getBookById = async (bookId: string | null): Promise<Book | null> => {
    if (!bookId) return null;

    const localBook = books.find((book) => book._id === bookId);
    if (localBook) return localBook;

    const cached = queryClient.getQueryData<Book>(['book', bookId]);
    if (cached) return cached;

    try {
      const fetched = await get_book_by_id(bookId);
      queryClient.setQueryData(['book', bookId], fetched);
      return fetched;
    } catch (error) {
      return null;
    }
  };

  return {
    books,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    getBookById,
  };
};
