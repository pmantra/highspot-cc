export const buildUrl = (baseUrl, searchText, page, pageSize) => {
    return `${baseUrl}?name=${searchText}&page=${page}&pageSize=${pageSize}`;
}