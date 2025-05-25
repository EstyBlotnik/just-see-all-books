import { useCallback, useEffect, useState } from 'react';
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
    const [searchInput, setSearchInput] = useState<string>('');
    const [sortBy, setSortBy] = useState<'title' | 'author'>('title');
    const [activeSearch, setActiveSearch] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Book[]>([]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value.length > 1) {
            try {
                const res = await fetchBooks({ page: 1, sortBy, search: value });
                setSuggestions(res.books.slice(0, 5));
            } catch (err) {
                console.error(err);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (bookTitle: string) => {
        setSearchInput(bookTitle);
        setSuggestions([]);
        setActiveSearch(bookTitle); // מפעיל את החיפוש
    };

    const handleSearchClick = () => {
        setActiveSearch(searchInput); // מפעיל את החיפוש, ואז useEffect ירוץ מחדש
    };

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetchBooks({ page, sortBy, search: activeSearch });

            if (res.books) {
                setBooks((prev) => [...prev, ...res.books]);
                setHasMore(res.hasMore);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const resetAndLoad = async () => {
            setPage(1);
            setHasMore(true);
            setBooks([]);
            setLoading(true);
            try {
                const res = await fetchBooks({ page, sortBy, search: activeSearch });
                if (res.books) {
                    setBooks((prev) => [...prev, ...res.books]);
                    setHasMore(res.hasMore);
                    setPage(2);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        resetAndLoad();
    }, [sortBy, activeSearch]);

    useInfiniteScroll({
        callback: loadMore,
        hasMore,
        loading,
    });

    return (
        <>
            <div className="controls">
                <div className="search-section">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="חפש ספר..."
                            value={searchInput}
                            onChange={handleSearchChange}
                            className="search-input"
                        />

                        <button onClick={handleSearchClick} className="search-button">
                            🔍
                        </button>

                        {/* Autocomplete suggestions */}
                        {suggestions.length > 0 && (
                            <ul className="autocomplete-list">
                                {suggestions.map((book) => (
                                    <li key={book._id} onClick={() => handleSuggestionClick(book.title)}>
                                        {book.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* בורר מיון */}
                    <label className="sort-label">
                        מיון לפי:&nbsp;
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'title' | 'author')}
                            className="sort-select"
                        >
                            <option value="title">כותר</option>
                            <option value="author">מחבר</option>
                        </select>
                    </label>
                </div>
            </div>


            <div className="book-grid">
                {books && books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
                {loading && <div>טוען...</div>}
            </div>
        </>
    );
};

export default BookList;
