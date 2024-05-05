import { fetchData } from './api';
import { useQuery } from '@tanstack/react-query';

const getPopularSearchWordList = () => {
    return fetchData('/popular-search-terms', {})
        .then((response) => {
            const { data: { data } } = response;

            return data;
        })
    ;
};

const getPopularSearchWordListQuery = () => {
    return useQuery({
        queryKey: ['/popular-search-terms'],
        queryFn: getPopularSearchWordList,
        staleTime: 5 * 300,
        retry: 0,
    })
};

export {
    getPopularSearchWordList,
    getPopularSearchWordListQuery,
};