import { useEffect } from 'react'

/**
 * Hook to fetch cards from api using the URL, searchKey and page passed. Api is called initially
 * and when user either searches using name or when scrolls down
 * Fetched cards are stored in component state
 * @param {*} baseUrl - URL of the api
 * @param {*} searchKey - search criteria matching name
 * @param {*} page - page number that changes as user scrolls down
 * @param {*} pageSize - set at 20
 * @param {*} dispatch -
 */
const useFetch = (url, searchText, cardDispatch, pageDispatch) => {
    useEffect (() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const doFetch = async () => {
            cardDispatch ({
                type: 'FETCH_CARDS_REQUEST'
            });
            try {
                //call api to fetch cards if there is a next page available
                //next page will be in response that becomes URL when page is scrolled
                if (url) {
                    const response = await fetch(url);
                    const { cards, _links, _totalCount } = await response.json();
                    if (!signal.aborted) {
                        //check if there is a next link available in the response and set it in page store
                        pageDispatch ({
                            type: 'SET_PAGE',
                            nextUrl: _links && _links.next ? _links.next : undefined,
                        });
                        //store cards in the cards store
                        //use different redux actions to differentiate user actions
                        cardDispatch ({
                            type: searchText.trim() !== '' ? 'SEARCH_CARDS_SUCCESS' : 'FETCH_CARDS_SUCCESS',
                            cards,
                            totalCount: _totalCount ? _totalCount : 0
                        });
                    }
                }

            } catch (error) {
                if (!signal.aborted) {
                    cardDispatch ({
                        type: 'FETCH_CARDS_ERROR',
                        error
                    });
                }
            } finally {
                if (!signal.aborted) {
                    cardDispatch ({
                        type: 'FETCH_CARDS_COMPLETE'
                    });
                }
            }
        }
        doFetch();

        return () => {
            abortController.abort();
        }
    }, [url, cardDispatch])
}

export default useFetch;