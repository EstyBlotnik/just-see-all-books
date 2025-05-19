import BookCard from './BookCard';

export const AllBooks = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <BookCard
                id="7110138626083"
                title="שירת ישראל: מבחר השירה העברית מקדמותה ועד העת האחרונה"
                author="שמריהו לוין"
                imageUrl="https://greenbrothers.co.il/cdn/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_medium.gif"
                price={80}
                condition="סביר"
                collectionLinks={[
                    { name: 'אנתולוגיות', url: '/collections/אנתולוגיות' },
                    { name: 'שירה', url: '/collections/שירה' },
                ]}
                isUsed={true}
            />
        </div>
    );
}

export default AllBooks;
