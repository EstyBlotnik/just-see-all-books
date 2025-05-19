import React from 'react';
import './BookCard.css'; // קובץ CSS מותאם לעיצוב

type BookCardProps = {
    id: string;
    title: string;
    author: string;
    imageUrl?: string;
    price: number;
    condition?: string;
    collectionLinks?: { name: string; url: string }[];
    isUsed?: boolean;
};

export const BookCard: React.FC<BookCardProps> = ({
    id,
    title,
    author,
    imageUrl,
    price,
    condition = 'סביר',
    collectionLinks = [],
    isUsed = true,
}) => {
    return (
        <div className="book-card" data-id={id}>
            <div
                className="cover"
                style={{
                    backgroundImage: `url(${imageUrl || '/no-image.gif'})`,
                }}
            >
                <a href={`/products/${id}`} className="cover-link" />
                <span className="options">
                    <button className="option-button">❤️ אהבתי</button>
                    <button className="option-button">➕ הוספה לסל</button>
                </span>
            </div>

            <div className="details">
                <h3>{title}</h3>
                <div className="more">
                    <b>מאת {author}</b>
                    <br />
                    {collectionLinks.map((link, i) => (
                        <span key={i}>
                            <a href={link.url}>{link.name}</a>
                            {i < collectionLinks.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>

                {isUsed && <div className="type">יד שניה</div>}

                <div className="book-status">
                    <span className="price">{price.toFixed(2)} ₪</span>
                    {condition && (
                        <span className="condition">
                            מצב הספר: <b>{condition}</b>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
