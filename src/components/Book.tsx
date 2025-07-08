import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Chip, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import type { Book } from '../types/Book';
import { useBooks } from '../hooks/useBooks';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const { isLoading, getBookById } = useBooks();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const bookData = await getBookById(id);
        if (bookData) {
          setBook(bookData);
        }
      }
    };

    fetchBook();
  }, [id]);

  const handleAllBooks = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Typography align='center' mt={4}>
        הספר לא נמצא.
      </Typography>
    );
  }

  return (
    <Box p={4} maxWidth='1000px' mx='auto' dir='rtl'>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        bgcolor='#f9f9f9'
        borderRadius={4}
        boxShadow={3}
        overflow='hidden'
      >
        <Box
          flexShrink={0}
          width={{ xs: '100%', md: 350, lg: 400, xl: 450 }}
          height={{ xs: 300, md: 400, lg: 500, xl: 550 }}
          position='relative'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            width='90%'
            height='90%'
            borderRadius={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {book?.image ? (
              <img
                src={book.image}
                alt='Book cover'
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : null}
          </Box>
        </Box>

        {/* Book Info Section */}
        <Box
          p={3}
          flex={1}
          minHeight={400}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
        >
          <Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={2}
            >
              <Typography variant='h5' fontWeight='bold' color='primary.dark'>
                {book.title}
              </Typography>
            </Box>

            <Typography variant='body1' gutterBottom>
              <strong>מחבר:</strong> {book.author}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>שנה:</strong> {book.yearOfPublication}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>הוצאה לאור:</strong> {book.publisher?.name}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>סוג כריכה:</strong> {book.coverType}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>מצב:</strong> {book.condition}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>תיאור:</strong> {book.description}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>קטגוריות:</strong>{' '}
              {book.categories
                ?.map((c) => c?.name)
                .filter(Boolean)
                .join(', ')}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>נדיר:</strong> {book.rare ? 'כן' : 'לא'} |{' '}
              <strong>חתום:</strong> {book.signed ? 'כן' : 'לא'}
            </Typography>
            <Typography variant='body1' gutterBottom>
              <strong>במלאי:</strong> {book.stock}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography
              variant='h6'
              display='inline'
              sx={{
                textDecoration: book.salePrice ? 'line-through' : 'none',
                fontWeight: book.salePrice ? 'normal' : 'bold',
                color: book.salePrice ? 'text.secondary' : 'text.primary',
              }}
            >
              ₪{book.price}
            </Typography>
            {book.salePrice && (
              <Typography
                variant='h6'
                display='inline'
                sx={{ ml: 2, fontWeight: 'bold', color: 'success.main' }}
              >
                ₪{book.salePrice}
              </Typography>
            )}
          </Box>

          <Box mt={2} display='flex' gap={1}>
            {book.rare && (
              <Chip label='נדיר' color='warning' variant='outlined' />
            )}
            {book.signed && (
              <Chip label='חתום' color='primary' variant='outlined' />
            )}
          </Box>
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={handleAllBooks}
            sx={{
              padding: '12px 0',
            }}
          >
            לצפיה בכל הספרים
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetailsPage;
