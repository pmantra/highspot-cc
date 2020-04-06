import { useEffect, useCallback } from 'react'

/**
 * Hook to apply infinite scrolling by incrementing the page count when user scrolls to the bottom
 * Uses scrollRef to listen to scrolling event and when scroll hits this reference an event is dispatched to increment the page count
 * As page count is incremented an event is dispatched to fetch cards from the api with this page
 * @param {*} scrollRef - an HTML element as scrolling reference at the bottom that listens to the scrolling event
 * @param {*} dispatch - event that is dispatched when scroll reaches scrollRef
 */
const useInfiniteScroll = (scrollRef, dispatch) => {
    const scrollObserver = useCallback (node => {
            new IntersectionObserver (entries => {
                entries.forEach (entry => {
                    if (entry.intersectionRatio > 0) {
                        dispatch ({ type: 'NEXT_PAGE' });
                    }
                });
            }).observe(node);
        }, [dispatch]
    );

    useEffect (() => {
        if (scrollRef.current) {
            scrollObserver (scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
}

export default useInfiniteScroll;