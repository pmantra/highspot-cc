import { START_PAGE, DEFAULT_LAYOUT, RELAXED_LAYOUT, COMPACT_LAYOUT } from '../utils/constants';

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
    const { type, hasNext } = action;
    switch (type) {
        case 'SET_PAGE':
            return { ...state, hasNext }
        case 'NEXT_PAGE':
            return { ...state, page: state.page + 1 };
        case 'RESET_PAGE':
            return { ...state, page: START_PAGE, hasNext: true };
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