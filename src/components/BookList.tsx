import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { fetchBooks } from '../api/booksApi';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import BookCard from './BookCard';
import './BookList.css';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadMore = async () => {
        setLoading(true);
        try {
            const newBooks = await fetchBooks(page);
            console.log(newBooks);
            setBooks((prev) => [...prev, ...newBooks]);
            setHasMore(newBooks.length > 0);
            setPage((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMore();
    }, []);

    useInfiniteScroll({
        callback: loadMore,
        hasMore,
        loading,
    });

    return (
        <div className="book-grid">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );

};

export default BookList;
