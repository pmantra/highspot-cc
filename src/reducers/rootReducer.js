import { DEFAULT_URL, DEFAULT_LAYOUT, RELAXED_LAYOUT, COMPACT_LAYOUT } from '../utils/constants';
import { buildUrl } from '../utils/helper';

export const cardReducer = (state, action) => {
    const { cards, type, error, next, totalCount, pageSize } = action;
    switch (type) {
        case 'FETCH_CARDS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_CARDS_SUCCESS':
            return { ...state,
                    cards: [...state.cards, ...cards],
                    error: null, loading: false,
                    next, totalCount, pageSize
            };
        case 'SEARCH_CARDS_SUCCESS':
            return { ...state,
                    cards,
                    error: null, loading: false,
                    next, totalCount, pageSize
            };
        case 'FETCH_CARDS_ERROR':
            return { ...state, error, loading: false };
        case 'FETCH_CARDS_COMPLETE':
            return { ...state, loading: false };
        case 'CLEAR_CARDS':
            return { ...state, cards:[] };
        default:
            return state;
    }
}

export const pageReducer = (state, action) => {
    const { type, nextUrl, searchText } = action;
    switch (type) {
        case 'SET_PAGE':
            return { ...state, nextUrl }
        case 'NEXT_PAGE':
            if (state.url.includes ('name')) {
                return state;
            }
            return { ...state, url:  state.nextUrl, page: state.page + 1 };
        case 'SEARCH_PAGE':
            return { ...state, url: buildUrl (searchText), nextUrl: DEFAULT_URL};
        case 'RESET_PAGE':
            return { ...state, url: DEFAULT_URL, nextUrl: DEFAULT_URL };
        default:
            return state;
    }
}

export const layoutReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'RELAXED_LAYOUT':
            return { ...state, layout: RELAXED_LAYOUT };
        case 'DEFAULT_LAYOUT':
            return { ...state, layout: DEFAULT_LAYOUT };
        case 'COMPACT_LAYOUT':
            return { ...state, layout: COMPACT_LAYOUT };
        default:
            return state
    }
}