import { API, START_PAGE, DEFAULT_PAGE_SIZE } from './constants';

export const buildUrl = (searchText) => {
    return `${API}?name=${searchText}&page=${START_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`;
}