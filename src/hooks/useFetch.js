import { useEffect } from 'react'
import { buildUrl } from '../utils/helper';

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
const useFetch = (baseUrl, searchKey, page, pageSize, dispatch) => {
    const url = buildUrl(baseUrl, searchKey, page, pageSize);
    useEffect (() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const doFetch = async () => {
            dispatch ({
                type: 'FETCH_CARDS_REQUEST'
            });
            try {
                const response = await fetch(url);
                const { cards, _links, _pageSize, _totalCount } = await response.json();
                if (!signal.aborted) {
                    dispatch ({
                        type: searchKey.trim() === '' ? 'FETCH_CARDS_SUCCESS' : 'SEARCH_CARDS_SUCCESS',
                        cards,
                        next: _links ? _links.next : '',
                        pageSize: _pageSize ? _pageSize : 0,
                        totalCount: _totalCount ? _totalCount : 0
                    });
                }
            } catch (error) {
                if (!signal.aborted) {
                    dispatch ({
                        type: 'FETCH_CARDS_ERROR',
                        error
                    });
                }
            } finally {
                if (!signal.aborted) {
                    dispatch ({
                        type: 'FETCH_CARDS_COMPLETE'
                    });
                }
            }
        }
        doFetch();

        return () => {
            abortController.abort();
        }
    }, [searchKey, page, dispatch])
}

export default useFetch;