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

    // 🆕 פרמטרי מיון
    const [sortBy, setSortBy] = useState<'title' | 'author'>('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const newBooks = await fetchBooks({ page, sortBy });
            setBooks((prev) => [...prev, ...newBooks]);
            setHasMore(newBooks.length > 0);
            setPage((prev) => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 🆕 ריסט בכל שינוי מיון
    useEffect(() => {
        const resetAndLoad = async () => {
            setPage(1);
            setHasMore(true);
            setBooks([]);
            setLoading(true);
            try {
                const newBooks = await fetchBooks({ page: 1, sortBy });
                setBooks(newBooks);
                setHasMore(newBooks.length > 0);
                setPage(2);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        resetAndLoad();
    }, [sortBy, sortOrder]);

    useInfiniteScroll({
        callback: loadMore,
        hasMore,
        loading,
    });

    return (
        <>
            {/* 🆕 בורר מיון */}
            <div className="sort-controls">
                <label>
                    Sort By:&nbsp;
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'title' | 'author')}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </label>
            </div>

            <div className="book-grid">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
                {loading && <div>טוען...</div>}
            </div>
        </>
    );
};

export default BookList;
