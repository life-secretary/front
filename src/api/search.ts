import { fetchData } from './api';
import { useQuery } from '@tanstack/react-query';

// API

const getSearchContentList = (params: any) => {
    return fetchData('/content/search', params)
        .then((response) => {
            const { data: { data } } = response;
            
            return data.content;
        })
};

const getSearchToDoList = (params: any) => {
    return fetchData('/todo/search', params)
        .then((response) => {
            const { data: { data } } = response;

            return data.content;
        })
};

const getCategoryContentList = (params: any) => {
    return fetchData('/content', params)
        .then((response) => {
            const { data: { data } } = response;

            return data.content;
        })
};

const getCategoryToDoList = (params: any) => {
    return fetchData('/todo', params)
        .then((response) => {
            const { data: { data } } = response;

            return data;
        })
};

const getPopularSearchWordList = () => {
    return fetchData('/popular-search-terms', {})
        .then((response) => {
            const { data: { data } } = response;

            return data;
        })
    ;
};

const getSimilarContentList = (params: any) => {
    return fetchData('/content/similar-users/reads', params)
        .then((response) => {
            const { data: { data } } = response;

            return data;
        })
}

// Query

const getSearchContentListQuery = (params: any) => {
    return useQuery({
        queryKey: ['/content/search', params],
        queryFn: () => getSearchContentList(params),
        enabled: params.title !== ''
    })
};

const getSearchToDoListQuery = (params: any) => {
    return useQuery({
        queryKey: ['/todo/search', params],
        queryFn: () => getSearchToDoList(params),
    })
};

const getCategoryContentListQuery = (params: any) => {
    return useQuery({
        queryKey: ['/content', params],
        queryFn: () =>  getCategoryContentList(params),
    });
};

const getCategoryToDoListQuery = (params: any) => {
    return useQuery({
        queryKey: ['/todo', params],
        queryFn: () => getCategoryToDoList(params),
    });
};

const getPopularSearchWordListQuery = () => {
    return useQuery({
        queryKey: ['/popular-search-terms'],
        queryFn: getPopularSearchWordList,
        staleTime: 5 * 300,
        retry: 0,
    })
};

const getSimilarContentListQuery = (params: any) => {
    return useQuery({
        queryKey: ['/content/similar-users/reads', params],
        queryFn: () => getSimilarContentList(params),
    })
};

export {
    getPopularSearchWordList,
    getPopularSearchWordListQuery,
    getSearchContentList,
    getSearchContentListQuery,
    getSearchToDoList,
    getSearchToDoListQuery,
    getCategoryContentList,
    getCategoryContentListQuery,
    getCategoryToDoList,
    getCategoryToDoListQuery,
    getSimilarContentList,
    getSimilarContentListQuery,
};