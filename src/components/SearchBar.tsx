import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState([]);
  const api = `${import.meta.env.VITE_API_BASE_URL}`;
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchResults();
    }
    if (debouncedQuery.length == 0) {
      setResults([]);
    }
  }, [debouncedQuery]);

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `${api}/search?search=${encodeURIComponent(debouncedQuery)}`
      );
      const data = await response.json();
      console.log(data);
      console.log(`${api}/search?search=${encodeURIComponent(debouncedQuery)}`);
      setResults(data.results);
    } catch (error) {
      console.error('שגיאה:', error);
    }
  };

  const handleSearch = () => {
    onSearch(query);
    setResults([]);
  };

  return (
    <div className='search-bar-container'>
      <div className='search-bar'>
        <input
          type='text'
          className='search-input'
          placeholder='מה למצוא לך?'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className='search-button' onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      <>
        {results.length > 0 && (
          <div className='search-results'>
            <ul>
              {results.slice(0, 5).map((item: any, index) => (
                <li key={index} className='search-result-item'>
                  <Link
                    to={`/book/${item._id}`}
                    onClick={() => {
                      setResults([]);
                    }}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.title || item.name || JSON.stringify(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </div>
  );
};

export default SearchBar;
