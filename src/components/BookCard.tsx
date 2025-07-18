import React from 'react';
import './BookCard.css'; // קובץ CSS מותאם לעיצוב
import type { Book } from '../types/Book';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export interface BookCardProps {
  book: Book;
}
const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'inactive' && prop !== 'outOfStock',
})<{ inactive?: boolean; outOfStock?: boolean }>(
  ({ inactive, outOfStock }) => ({
    textDecoration: 'none',
    opacity: inactive || outOfStock ? 0.5 : 1,
    pointerEvents: inactive ? 'none' : 'auto', // אופציונלי: למנוע לחיצה אם לא פעיל
  })
);

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isInactive = book.isActive === false;
  const isOutOfStock = book.stock <= 0;
  return (
    <StyledLink
      to={`/book/${book._id}`}
      inactive={isInactive}
      outOfStock={isOutOfStock}
    >
      <div className='book-card' data-id={book._id}>
        <div
          className='cover'
          style={{
            backgroundImage: `url(${book.image || '/no-image.gif'})`,
          }}
        >
          {/* <a href={`/products/${book.id}`} className="cover-link" /> */}
          <span className='options'>
            <button className='option-button'>❤️ אהבתי</button>
            <button className='option-button'>➕ הוספה לסל</button>
          </span>
        </div>

        <div className='details'>
          <h3>{book.title}</h3>
          <div className='more'>
            <b>מאת {book.author}</b>
          </div>

          <div className='book-status'>
            <span className='price'>{book.price.toFixed(2)} ₪</span>
            {book.condition && (
              <span className='condition'>
                מצב הספר: <b>{book.condition}</b>
              </span>
            )}
          </div>
        </div>
      </div>
    </StyledLink>
  );
};

export default BookCard;
