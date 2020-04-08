import { useEffect, useCallback, useRef } from 'react'

/**
 * Hook to lazily download images only when they come into view
 * Until then user will be shown a placeholder image
 * @param {*} cardSelector - to select the cards that are in view and
 * replace their placeholder image with the imageUrl from api
 * @param {*} cards - cards that are returned by the api
 */
const useLazyLoading = (cardSelector, cards) => {
    const cardObserver = useCallback (node => {
        const intersectionObserver = new IntersectionObserver (entries => {
            entries.forEach (entry => {
                if (entry.intersectionRatio > 0) {
                    const currentCard = entry.target;
                    const imageUrl = currentCard.dataset.url;
                    if (!imageUrl) {
                        console.error ('Image Url is invalid');
                    } else {
                        //replace placeholder image with image url
                        currentCard.childNodes[0].src = imageUrl;
                    }
                    intersectionObserver.unobserve(node);
                }
            });
        });
        intersectionObserver.observe(node);
    }, []);

    const cardsRef = useRef (null);
    useEffect (() => {
        //fetch all cards that were newly fetched with the selector
        cardsRef.current = document.querySelectorAll (cardSelector);
        if (cardsRef.current) {
            cardsRef.current.forEach (card => cardObserver(card));
        }
    }, [cardObserver, cardsRef, cardSelector, cards]);
}

export default useLazyLoading;