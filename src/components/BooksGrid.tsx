import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import BookCard from './BookCard';
import { useBooks } from '../hooks/useBooks';
import { useSearchParams } from 'react-router-dom';

const BooksGrid: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const { books, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBooks({
      q,
      category,
    });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver);
    if (bottomRef.current) observerRef.current.observe(bottomRef.current);

    return () => observerRef.current?.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    console.log('books:', books);
  }, [books]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }

  return (
    <>
      <Container
        sx={{
          marginTop: 4,
          direction: 'rtl',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ color: '#333', fontSize: '32px' }}>כל הספרים שלנו</h1>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
            direction: 'rtl',
          }}
        >
          {!books ||
            (books.length === 0 && (
              <Typography align='center' variant='h5' sx={{ marginTop: 4 }}>
                לא נמצאו ספרים.
              </Typography>
            ))}
          {books &&
            books.length > 0 &&
            books.map((book) => {
              if (!book || !book._id) return null;

              return (
                <Box
                  key={book._id}
                  sx={{
                    flex: '1 1 250px',
                    maxWidth: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <BookCard book={book} />
                </Box>
              );
            })}
        </Box>
        <div ref={bottomRef} style={{ height: '1px' }} />
        {isFetchingNextPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress color='primary' />
          </Box>
        )}
      </Container>
    </>
  );
};

export default BooksGrid;
