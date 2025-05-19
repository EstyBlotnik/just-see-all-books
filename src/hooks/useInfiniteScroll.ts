import { useEffect } from 'react';

interface UseInfiniteScrollOptions {
    callback: () => void;
    hasMore: boolean;
    loading: boolean;
    threshold?: number;
}

export const useInfiniteScroll = ({
    callback,
    hasMore,
    loading,
    threshold = 300,
}: UseInfiniteScrollOptions) => {
    useEffect(() => {
        const handleScroll = () => {
            const bottomReached =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

            if (bottomReached && hasMore && !loading) {
                callback();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [callback, hasMore, loading, threshold]);
};
