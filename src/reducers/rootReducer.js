import { START_PAGE } from '../utils/constants';

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
        default:
            return state;
    }
}

export const pageReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'NEXT_PAGE':
            return { ...state, page: state.page + 1 };
        case 'RESET_PAGE':
            return { ...state, page: START_PAGE};
        default:
            return state;
    }
}